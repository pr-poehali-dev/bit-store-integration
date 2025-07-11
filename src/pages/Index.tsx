import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Icon from "@/components/ui/icon";

interface Beat {
  id: number;
  title: string;
  artist: string;
  genre: string;
  bpm: number;
  price: number;
  image: string;
  duration: string;
  tags: string[];
}

const beats: Beat[] = [
  {
    id: 1,
    title: "Dark Vibes",
    artist: "ПRCR",
    genre: "Trap",
    bpm: 140,
    price: 2500,
    image: "/img/5a69f4f0-8da3-4989-b1e1-4bac6e5262d9.jpg",
    duration: "3:42",
    tags: ["Dark", "Trap", "Hard"],
  },
  {
    id: 2,
    title: "Street Dreams",
    artist: "ПRCR",
    genre: "Hip-Hop",
    bpm: 85,
    price: 3000,
    image: "/img/bce528bf-c271-4b88-a602-d5363e4e0321.jpg",
    duration: "4:15",
    tags: ["Hip-Hop", "Melodic", "Boom-Bap"],
  },
  {
    id: 3,
    title: "Neon Nights",
    artist: "ПRCR",
    genre: "Electronic",
    bpm: 128,
    price: 2000,
    image: "/img/3b92e4aa-1817-4b89-a504-29785005b172.jpg",
    duration: "3:28",
    tags: ["Electronic", "Synthwave", "Ambient"],
  },
  {
    id: 4,
    title: "Urban Flow",
    artist: "ПRCR",
    genre: "Trap",
    bpm: 150,
    price: 2800,
    image: "/img/5a69f4f0-8da3-4989-b1e1-4bac6e5262d9.jpg",
    duration: "3:55",
    tags: ["Trap", "Urban", "Bass"],
  },
  {
    id: 5,
    title: "Midnight Groove",
    artist: "ПRCR",
    genre: "R&B",
    bpm: 95,
    price: 3500,
    image: "/img/bce528bf-c271-4b88-a602-d5363e4e0321.jpg",
    duration: "4:32",
    tags: ["R&B", "Smooth", "Groove"],
  },
  {
    id: 6,
    title: "Future Bass",
    artist: "ПRCR",
    genre: "Electronic",
    bpm: 135,
    price: 2200,
    image: "/img/3b92e4aa-1817-4b89-a504-29785005b172.jpg",
    duration: "3:18",
    tags: ["Electronic", "Future", "Bass"],
  },
];

const Index = () => {
  const [currentBeat, setCurrentBeat] = useState<Beat | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cart, setCart] = useState<Beat[]>([]);
  const [volume, setVolume] = useState([75]);

  const togglePlay = (beat: Beat) => {
    if (currentBeat?.id === beat.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentBeat(beat);
      setIsPlaying(true);
    }
  };

  const addToCart = (beat: Beat) => {
    if (!cart.find((item) => item.id === beat.id)) {
      setCart([...cart, beat]);
    }
  };

  const removeFromCart = (beatId: number) => {
    setCart(cart.filter((item) => item.id !== beatId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, beat) => total + beat.price, 0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-display font-bold text-primary">
                BEAT STORE
              </h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Создано в Поехали! 🚀
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="relative">
                    <Icon name="ShoppingCart" size={16} />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                    <SheetDescription>
                      {cart.length === 0
                        ? "Ваша корзина пуста"
                        : `Товаров в корзине: ${cart.length}`}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cart.map((beat) => (
                      <div
                        key={beat.id}
                        className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={beat.image}
                            alt={beat.title}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div>
                            <p className="font-medium">{beat.title}</p>
                            <p className="text-sm text-muted-foreground">
                              ₽{beat.price}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(beat.id)}
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      </div>
                    ))}
                    {cart.length > 0 && (
                      <div className="pt-4 border-t">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">Итого:</span>
                          <span className="font-bold text-primary">
                            ₽{getTotalPrice()}
                          </span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Player */}
      {currentBeat && (
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-4">
                <img
                  src={currentBeat.image}
                  alt={currentBeat.title}
                  className="w-12 h-12 rounded object-cover"
                />
                <div>
                  <h3 className="font-medium">{currentBeat.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {currentBeat.artist}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePlay(currentBeat)}
                >
                  <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
                </Button>
                <div className="flex items-center space-x-2">
                  <Icon name="Volume2" size={16} />
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="w-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-background to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Профессиональные <span className="text-primary">биты</span> и{" "}
            <span className="text-primary">сведения</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Высококачественные инструменталы для ваших треков. Лицензии,
            эксклюзивы и сведение на профессиональном уровне.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg">
              <Icon name="Play" size={20} className="mr-2" />
              Слушать биты
            </Button>
            <Button variant="outline" size="lg">
              <Icon name="Info" size={20} className="mr-2" />
              Подробнее
            </Button>
          </div>
        </div>
      </section>

      {/* Beat Catalog */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-display font-bold">Каталог битов</h2>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="Filter" size={16} className="mr-2" />
                Фильтры
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="ArrowUpDown" size={16} className="mr-2" />
                Сортировка
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beats.map((beat) => (
              <Card
                key={beat.id}
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="p-0">
                  <div className="relative">
                    <img
                      src={beat.image}
                      alt={beat.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg flex items-center justify-center">
                      <Button
                        size="lg"
                        variant="secondary"
                        onClick={() => togglePlay(beat)}
                      >
                        <Icon
                          name={
                            currentBeat?.id === beat.id && isPlaying
                              ? "Pause"
                              : "Play"
                          }
                          size={24}
                        />
                      </Button>
                    </div>
                    <Badge className="absolute top-2 left-2">
                      {beat.genre}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="absolute top-2 right-2"
                    >
                      {beat.bpm} BPM
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">{beat.title}</CardTitle>
                  <CardDescription className="mb-3">
                    {beat.artist}
                  </CardDescription>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {beat.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Clock" size={14} />
                      <span>{beat.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-primary">
                        ₽{beat.price}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => addToCart(beat)}
                        disabled={cart.some((item) => item.id === beat.id)}
                      >
                        {cart.some((item) => item.id === beat.id) ? (
                          <Icon name="Check" size={16} />
                        ) : (
                          <Icon name="ShoppingCart" size={16} />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-display font-semibold mb-4">
                BEAT STORE
              </h3>
              <p className="text-sm text-muted-foreground">
                Профессиональные биты и сведения для артистов и продюсеров.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Лицензии</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Basic License</li>
                <li>Premium License</li>
                <li>Exclusive License</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Сведение</li>
                <li>Мастеринг</li>
                <li>Кастом биты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>info@beatstore.ru</li>
                <li>+7 (999) 123-45-67</li>
                <li>Telegram: @beatstore</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2024 BEAT STORE. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
