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
  licenses: {
    wav: number;
    stems: number;
    exclusive: number;
  };
}

interface License {
  type: "wav" | "stems" | "exclusive";
  name: string;
  description: string;
  features: string[];
  icon: string;
}

const licenseTypes: License[] = [
  {
    type: "wav",
    name: "WAV License",
    description: "Стандартная лицензия для коммерческого использования",
    features: [
      "Высокое качество WAV",
      "До 10,000 копий",
      "Радио трансляция",
      "Интернет потоки",
    ],
    icon: "Music",
  },
  {
    type: "stems",
    name: "STEMS License",
    description: "Разделённые дорожки для полного контроля",
    features: [
      "Все элементы отдельно",
      "Полный микс",
      "Неограниченные копии",
      "Коммерческое использование",
    ],
    icon: "Layers",
  },
  {
    type: "exclusive",
    name: "EXCLUSIVE License",
    description: "Эксклюзивные права на трек",
    features: [
      "Только вы можете использовать",
      "Все форматы включены",
      "Неограниченные права",
      "Передача авторских прав",
    ],
    icon: "Crown",
  },
];

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
    licenses: {
      wav: 2500,
      stems: 7500,
      exclusive: 25000,
    },
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
    licenses: {
      wav: 3000,
      stems: 9000,
      exclusive: 30000,
    },
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
    licenses: {
      wav: 2000,
      stems: 6000,
      exclusive: 20000,
    },
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
    licenses: {
      wav: 2800,
      stems: 8400,
      exclusive: 28000,
    },
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
    licenses: {
      wav: 3500,
      stems: 10500,
      exclusive: 35000,
    },
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
    licenses: {
      wav: 2200,
      stems: 6600,
      exclusive: 22000,
    },
  },
];

const Index = () => {
  const [currentBeat, setCurrentBeat] = useState<Beat | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cart, setCart] = useState<Beat[]>([]);
  const [volume, setVolume] = useState([75]);
  const [progress, setProgress] = useState([0]);
  const [isLooping, setIsLooping] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState("0:00");

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

  const skipBackward = () => {
    setProgress([Math.max(0, progress[0] - 10)]);
  };

  const skipForward = () => {
    setProgress([Math.min(100, progress[0] + 10)]);
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
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
            <div className="py-4">
              <div className="flex items-center justify-between mb-4">
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
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addToCart(currentBeat)}
                    disabled={cart.some((item) => item.id === currentBeat.id)}
                  >
                    {cart.some((item) => item.id === currentBeat.id) ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <Icon name="ShoppingCart" size={16} />
                    )}
                  </Button>
                  <span className="text-sm font-semibold text-primary">
                    ₽{currentBeat.price}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-sm text-muted-foreground min-w-[40px]">
                  {currentTime}
                </span>
                <Slider
                  value={progress}
                  onValueChange={setProgress}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground min-w-[40px]">
                  {totalTime || currentBeat.duration}
                </span>
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={skipBackward}>
                    <Icon name="SkipBack" size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => togglePlay(currentBeat)}
                  >
                    <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={skipForward}>
                    <Icon name="SkipForward" size={16} />
                  </Button>
                  <Button
                    variant={isLooping ? "default" : "ghost"}
                    size="sm"
                    onClick={toggleLoop}
                  >
                    <Icon name="Repeat" size={16} />
                  </Button>
                </div>
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

      {/* License Types */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">
              Типы лицензий
            </h2>
            <p className="text-lg text-muted-foreground">
              Выберите подходящий тариф для вашего проекта
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {licenseTypes.map((license) => (
              <Card
                key={license.type}
                className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <Icon
                        name={license.icon as any}
                        size={32}
                        className="text-primary"
                      />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{license.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {license.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {license.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-center"
                      >
                        <Icon
                          name="Check"
                          size={16}
                          className="text-green-500 mr-2"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
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

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Clock" size={14} />
                      <span>{beat.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-primary">
                        от ₽{beat.licenses.wav}
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

                  {/* License Options */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-secondary/50 rounded text-sm">
                      <div className="flex items-center space-x-2">
                        <Icon name="Music" size={14} />
                        <span>WAV</span>
                      </div>
                      <span className="font-medium">₽{beat.licenses.wav}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-secondary/50 rounded text-sm">
                      <div className="flex items-center space-x-2">
                        <Icon name="Layers" size={14} />
                        <span>STEMS</span>
                      </div>
                      <span className="font-medium">
                        ₽{beat.licenses.stems}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-secondary/50 rounded text-sm">
                      <div className="flex items-center space-x-2">
                        <Icon name="Crown" size={14} />
                        <span>EXCLUSIVE</span>
                      </div>
                      <span className="font-medium">
                        ₽{beat.licenses.exclusive}
                      </span>
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
