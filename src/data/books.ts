export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  subGenres: string[];
  coverImage?: string;
  quotes: Array<{
    text: string;
    page?: number;
  }>;
  description: string;
  pageCount: number;
  rating: number;
}

export const booksData: Book[] = [
  {
    id: '1',
    title: 'Der große Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925,
    genre: 'Klassiker',
    subGenres: ['Drama', 'Tragödie', 'Liebesroman'],
    quotes: [
      {
        text: 'So schlugen wir weiter, Boote gegen die Strömung, unaufhörlich in die Vergangenheit zurückgetrieben.',
        page: 180
      },
      {
        text: 'Ich war in meinem Leben gleichzeitig drinnen und draußen, bezaubert und abgestoßen von der unerschöpflichen Vielfalt des Lebens.',
        page: 35
      },
      {
        text: 'Jeder verdächtigt jeden zumindest einmal einer Sache, deren er selbst fähig ist.',
        page: 48
      }
    ],
    description: 'Eine Geschichte über den amerikanischen Traum, Liebe und Dekadenz in den 1920er Jahren.',
    pageCount: 180,
    rating: 4.5
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    genre: 'Dystopie',
    subGenres: ['Science Fiction', 'Politisch', 'Drama'],
    quotes: [
      {
        text: 'Krieg bedeutet Frieden. Freiheit ist Sklaverei. Unwissenheit ist Stärke.',
        page: 6
      },
      {
        text: 'Wer die Vergangenheit kontrolliert, kontrolliert die Zukunft. Wer die Gegenwart kontrolliert, kontrolliert die Vergangenheit.',
        page: 37
      },
      {
        text: 'Big Brother sieht dich.',
        page: 3
      }
    ],
    description: 'Ein dystopischer Roman über totale Überwachung und die Manipulation der Wahrheit.',
    pageCount: 328,
    rating: 4.7
  },
  {
    id: '3',
    title: 'Harry Potter und der Stein der Weisen',
    author: 'J.K. Rowling',
    year: 1997,
    genre: 'Fantasy',
    subGenres: ['Jugendbuch', 'Abenteuer', 'Magie'],
    quotes: [
      {
        text: 'Es sind nicht unsere Fähigkeiten, die zeigen, wer wir wirklich sind, sondern unsere Entscheidungen.',
        page: 214
      },
      {
        text: 'Es braucht eine Menge Mut, sich seinen Feinden zu stellen, aber genauso viel, sich seinen Freunden in den Weg zu stellen.',
        page: 306
      },
      {
        text: 'Der Spiegel zeigt uns nichts weiter als das tiefste und verzweifeltste Verlangen unseres Herzens.',
        page: 208
      }
    ],
    description: 'Der Beginn der magischen Reise eines jungen Zauberers in Hogwarts.',
    pageCount: 335,
    rating: 4.8
  },
  {
    id: '4',
    title: 'Der Alchemist',
    author: 'Paulo Coelho',
    year: 1988,
    genre: 'Philosophie',
    subGenres: ['Spirituell', 'Abenteuer', 'Selbstfindung'],
    quotes: [
      {
        text: 'Wenn du etwas willst, dann wird das ganze Universum dazu beitragen, dass du es auch erreichst.',
        page: 22
      },
      {
        text: 'Es ist die einfachste Sache der Welt, sich in der eigenen Welt zu verlieren.',
        page: 131
      },
      {
        text: 'Die größte Lüge der Welt ist, dass wir irgendwann die Kontrolle über unser Leben verlieren.',
        page: 76
      }
    ],
    description: 'Eine inspirierende Geschichte über das Verfolgen von Träumen und die Suche nach dem eigenen Schicksal.',
    pageCount: 198,
    rating: 4.6
  },
  {
    id: '5',
    title: 'Die Verwandlung',
    author: 'Franz Kafka',
    year: 1915,
    genre: 'Klassiker',
    subGenres: ['Existentialismus', 'Absurde Literatur', 'Novelle'],
    quotes: [
      {
        text: 'Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt.',
        page: 1
      },
      {
        text: 'Ich kann nicht anders, als meine Pflicht zu tun.',
        page: 45
      },
      {
        text: 'War er ein Tier, da ihn Musik so ergriff?',
        page: 49
      }
    ],
    description: 'Eine surreale Erzählung über Entfremdung und die menschliche Existenz.',
    pageCount: 74,
    rating: 4.3
  },
  {
    id: '6',
    title: 'Der Herr der Ringe',
    author: 'J.R.R. Tolkien',
    year: 1954,
    genre: 'Fantasy',
    subGenres: ['Epos', 'Abenteuer', 'High Fantasy'],
    quotes: [
      {
        text: 'Nicht alle, die wandern, sind verloren.',
        page: 170
      },
      {
        text: 'Selbst die Kleinsten können den Lauf der Zukunft ändern.',
        page: 358
      },
      {
        text: 'Es gibt noch andere Mächte in dieser Welt außer dem Willen zum Bösen.',
        page: 267
      }
    ],
    description: 'Das epische Fantasy-Meisterwerk über die Reise zur Zerstörung des Einen Rings.',
    pageCount: 1178,
    rating: 4.9
  },
  {
    id: '7',
    title: 'Die Tribute von Panem',
    author: 'Suzanne Collins',
    year: 2008,
    genre: 'Dystopie',
    subGenres: ['Jugendbuch', 'Action', 'Romance'],
    quotes: [
      {
        text: 'Mögen die Chancen stets zu euren Gunsten stehen.',
        page: 18
      },
      {
        text: 'Ich bin mehr als nur ein Stück in ihren Spielen.',
        page: 142
      },
      {
        text: 'Feuer brennt heller in der Dunkelheit.',
        page: 231
      }
    ],
    description: 'In einer dystopischen Zukunft kämpfen Jugendliche in einer tödlichen Arena ums Überleben.',
    pageCount: 414,
    rating: 4.4
  },
  {
    id: '8',
    title: 'Stolz und Vorurteil',
    author: 'Jane Austen',
    year: 1813,
    genre: 'Klassiker',
    subGenres: ['Liebesroman', 'Gesellschaftsroman', 'Komödie'],
    quotes: [
      {
        text: 'Es ist eine Wahrheit, allgemein anerkannt, dass ein Junggeselle im Besitz eines schönen Vermögens einer Frau bedarf.',
        page: 1
      },
      {
        text: 'Ich könnte dir leicht vergeben, wärst du nicht so stolz.',
        page: 189
      },
      {
        text: 'Man kann von mir nicht erwarten, dass ich auf der gleichen Seite wie Mr. Darcy stehe.',
        page: 97
      }
    ],
    description: 'Ein zeitloser Liebesroman über Vorurteile, Missverständnisse und die Suche nach wahrer Liebe.',
    pageCount: 432,
    rating: 4.6
  },
  {
    id: '9',
    title: 'Der Vorleser',
    author: 'Bernhard Schlink',
    year: 1995,
    genre: 'Drama',
    subGenres: ['Historisch', 'Liebesroman', 'Tragödie'],
    quotes: [
      {
        text: 'Wie sollte ich mich von ihr distanzieren? Ich hatte sie ja geliebt.',
        page: 156
      },
      {
        text: 'Die Toten können nicht vergeben. Sie können nur vergessen werden.',
        page: 203
      },
      {
        text: 'Was ich getan habe, kann ich nicht ungeschehen machen.',
        page: 178
      }
    ],
    description: 'Eine bewegende Geschichte über Schuld, Liebe und die Aufarbeitung der Vergangenheit.',
    pageCount: 208,
    rating: 4.2
  },
  {
    id: '10',
    title: 'Illuminati',
    author: 'Dan Brown',
    year: 2000,
    genre: 'Thriller',
    subGenres: ['Mystery', 'Verschwörung', 'Action'],
    quotes: [
      {
        text: 'Die Wissenschaft und Religion sind keine Feinde. Sie sind einfach zu dumm, um ihre Gemeinsamkeiten zu sehen.',
        page: 234
      },
      {
        text: 'Die Wahrheit ist manchmal so unglaublich, dass niemand sie glauben kann.',
        page: 412
      },
      {
        text: 'Zeit ist relativ. Für einen Gefangenen vergeht sie langsam, für jemanden in Gefahr sehr schnell.',
        page: 89
      }
    ],
    description: 'Robert Langdon jagt durch Rom, um eine Verschwörung gegen den Vatikan aufzudecken.',
    pageCount: 624,
    rating: 4.1
  }
];
