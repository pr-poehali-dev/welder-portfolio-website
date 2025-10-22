import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [callbackData, setCallbackData] = useState({
    name: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const services = [
    {
      icon: "Home",
      title: "Металлические навесы",
      description: "Прочные навесы для авто, беседок и хозяйственных нужд",
    },
    {
      icon: "DoorClosed",
      title: "Ворота",
      description: "Надежные распашные, откатные и секционные ворота",
    },
    {
      icon: "Fence",
      title: "Заборы",
      description: "Долговечные металлические ограждения любой сложности",
    },
    {
      icon: "Wrench",
      title: "Металлоконструкции",
      description: "Изделия по индивидуальным проектам и чертежам",
    },
  ];

  const portfolio = [
    {
      image: "https://cdn.poehali.dev/projects/c6691043-9551-4d31-96fb-dfc579f1ea16/files/c1e89a07-562b-4469-8bd0-6c55ab6f87b8.jpg",
      title: "Металлические ворота",
      description: "Откатные ворота с автоматикой",
    },
    {
      image: "https://cdn.poehali.dev/projects/c6691043-9551-4d31-96fb-dfc579f1ea16/files/2ad73e56-e181-4fd3-9a84-11db8563dec8.jpg",
      title: "Навес для автомобилей",
      description: "Современная конструкция с поликарбонатом",
    },
    {
      image: "https://cdn.poehali.dev/projects/c6691043-9551-4d31-96fb-dfc579f1ea16/files/419c79b6-07b1-491f-a5b9-337c94a5450d.jpg",
      title: "Декоративный забор",
      description: "Кованые элементы с порошковой покраской",
    },
  ];

  const testimonials = [
    {
      name: "Александр М.",
      text: "Отличная работа! Навес стоит уже 3 года — ни капли ржавчины. Ребята знают свое дело.",
      rating: 5,
    },
    {
      name: "Елена К.",
      text: "Заказывали ворота и забор для дачи. Сделали быстро и качественно. Рекомендую!",
      rating: 5,
    },
    {
      name: "Дмитрий П.",
      text: "Делали сложную металлоконструкцию для бизнеса. Все четко по чертежам, без косяков.",
      rating: 5,
    },
  ];

  const sendToTelegram = async (data: { name: string; phone: string; message?: string }) => {
    const response = await fetch('https://functions.poehali.dev/95eff8ed-1746-45e4-a86c-000e0b1e4d6d', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Ошибка отправки');
    }
    
    return response.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await sendToTelegram(formData);
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время",
      });
      setFormData({ name: "", phone: "", message: "" });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await sendToTelegram({
        ...callbackData,
        message: "Заказ обратного звонка",
      });
      toast({
        title: "Заявка принята!",
        description: "Мы перезвоним вам в течение 15 минут",
      });
      setCallbackData({ name: "", phone: "" });
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Flame" className="text-primary" size={32} />
            <span className="text-2xl font-bold text-secondary">МеталлМастер</span>
          </div>
          <div className="hidden md:flex gap-6">
            <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">Портфолио</a>
            <a href="#about" className="hover:text-primary transition-colors">О нас</a>
            <a href="#testimonials" className="hover:text-primary transition-colors">Отзывы</a>
            <a href="#contact" className="hover:text-primary transition-colors">Контакты</a>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="Phone" size={18} className="mr-2" />
                Заказать звонок
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Заказать обратный звонок</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCallbackSubmit} className="space-y-4 mt-4">
                <div>
                  <Input 
                    placeholder="Ваше имя"
                    value={callbackData.name}
                    onChange={(e) => setCallbackData({...callbackData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Input 
                    placeholder="Телефон"
                    type="tel"
                    value={callbackData.phone}
                    onChange={(e) => setCallbackData({...callbackData, phone: e.target.value})}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                  {isSubmitting ? "Отправка..." : "Заказать звонок"}
                  <Icon name="Phone" size={18} className="ml-2" />
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </nav>
      </header>

      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Металлоконструкции любой сложности
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Навесы, ворота, заборы и изделия на заказ. Гарантия качества 5 лет.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8">
                  Получить расчет
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-secondary text-lg px-8">
                  Наши работы
                </Button>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-bold text-primary">15+</div>
                  <div className="text-white/80">лет опыта</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">500+</div>
                  <div className="text-white/80">проектов</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">100%</div>
                  <div className="text-white/80">гарантия</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://cdn.poehali.dev/projects/c6691043-9551-4d31-96fb-dfc579f1ea16/files/c1e89a07-562b-4469-8bd0-6c55ab6f87b8.jpg"
                alt="Сварочные работы"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши услуги</h2>
            <p className="text-xl text-muted-foreground">Профессиональные сварочные работы под ключ</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={service.icon} className="text-primary" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Портфолио работ</h2>
            <p className="text-xl text-muted-foreground">Примеры наших реализованных проектов</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {portfolio.map((item, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">О компании</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Мы — команда профессиональных сварщиков с опытом работы более 15 лет. 
                Специализируемся на изготовлении металлоконструкций любой сложности.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle2" className="text-primary mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold mb-1">Профессионализм</h4>
                    <p className="text-muted-foreground">Сертифицированные сварщики 5-6 разряда</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle2" className="text-primary mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold mb-1">Качество материалов</h4>
                    <p className="text-muted-foreground">Работаем только с проверенными поставщиками металла</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle2" className="text-primary mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold mb-1">Гарантия 5 лет</h4>
                    <p className="text-muted-foreground">Уверены в своей работе — даем долгосрочную гарантию</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://cdn.poehali.dev/projects/c6691043-9551-4d31-96fb-dfc579f1ea16/files/2ad73e56-e181-4fd3-9a84-11db8563dec8.jpg"
                alt="О нас"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Отзывы клиентов</h2>
            <p className="text-xl text-muted-foreground">Что говорят о нас наши заказчики</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" className="text-primary fill-primary" size={20} />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <div className="font-semibold">{testimonial.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-secondary text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Свяжитесь с нами</h2>
              <p className="text-xl text-white/90 mb-8">
                Оставьте заявку и получите бесплатный расчет стоимости
              </p>
              <div className="space-y-4">
                <a href="tel:+79951100799" className="flex items-center gap-3 hover:text-primary transition-colors">
                  <Icon name="Phone" size={24} className="text-primary" />
                  <span className="text-lg">+7 (995) 110-07-99</span>
                </a>
                <a href="https://wa.me/79951100799" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                  <Icon name="MessageCircle" size={24} className="text-primary" />
                  <span className="text-lg">WhatsApp: +7 (995) 110-07-99</span>
                </a>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" size={24} className="text-primary" />
                  <span className="text-lg">info@metallmaster.ru</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" size={24} className="text-primary" />
                  <span className="text-lg">г. Москва, ул. Промышленная, 15</span>
                </div>
              </div>
            </div>
            <Card className="bg-white">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input 
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Input 
                      placeholder="Телефон"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Textarea 
                      placeholder="Опишите ваш проект"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={isSubmitting}>
                    {isSubmitting ? "Отправка..." : "Отправить заявку"}
                    <Icon name="Send" size={18} className="ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-secondary/95 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Flame" className="text-primary" size={28} />
            <span className="text-xl font-bold">МеталлМастер</span>
          </div>
          <p className="text-white/70">© 2024 МеталлМастер. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;