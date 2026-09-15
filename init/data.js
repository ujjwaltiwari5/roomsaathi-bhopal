const sampleListings =[
  {
    title: "Jodhpur Blue City Haveli",
    description: "A restored blue-walled haveli in the heart of Jodhpur, with rooftop views of Mehrangarh Fort and the winding lanes of the old city.",
    price: 2900,
    location: "Jodhpur",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/jodhpur-haveli/800/600",
      filename: "jodhpur_haveli",
    },
  },
  {
    title: "Jaisalmer Desert Fort Stay",
    description: "A sandstone guesthouse inside the living fort of Jaisalmer, with camel safaris and Sam sand dune sunset trips nearby.",
    price: 2600,
    location: "Jaisalmer",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/jaisalmer-fort/800/600",
      filename: "jaisalmer_fort",
    },
  },
  {
    title: "Mount Abu Lakeview Cottage",
    description: "A quiet hill-station cottage overlooking Nakki Lake, surrounded by Aravalli forests and cool Rajasthan hill weather.",
    price: 2100,
    location: "Mount Abu",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/mountabu-lake/800/600",
      filename: "mountabu_lake",
    },
  },
  {
    title: "Nainital Lakeside Cabin",
    description: "A wooden cabin right on the banks of Naini Lake, with boat rides, mall road walks, and pine-covered hills all around.",
    price: 2400,
    location: "Nainital",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/nainital-lake/800/600",
      filename: "nainital_lake",
    },
  },
  {
    title: "Mussoorie Hilltop Homestay",
    description: "A family-run homestay perched above the Doon Valley, with misty mornings, Mall Road access, and Himalayan foothill views.",
    price: 2000,
    location: "Mussoorie",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/mussoorie-hilltop/800/600",
      filename: "mussoorie_hilltop",
    },
  },
  {
    title: "McLeod Ganj Mountain Loft",
    description: "A cozy loft near the Dalai Lama Temple in McLeod Ganj, popular for monastery walks, cafes, and Himalayan trekking routes.",
    price: 1800,
    location: "Dharamshala",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/mcleodganj-loft/800/600",
      filename: "mcleodganj_loft",
    },
  },
  {
    title: "Kasol Riverside Cafe Stay",
    description: "A wooden riverside stay in the Parvati Valley, surrounded by pine forests, trance cafes, and easy access to Kheerganga treks.",
    price: 1500,
    location: "Kasol",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/kasol-river/800/600",
      filename: "kasol_river",
    },
  },
  {
    title: "Spiti Valley High-Altitude Homestay",
    description: "A traditional mud-brick homestay in the cold desert of Spiti, with starlit skies, monasteries, and dramatic Himalayan terrain.",
    price: 1700,
    location: "Spiti Valley",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/spiti-homestay/800/600",
      filename: "spiti_homestay",
    },
  },
  {
    title: "Hampi Boulder-View Guesthouse",
    description: "A rustic guesthouse among Hampi's giant boulders and ancient ruins, with sunrise views over the Tungabhadra River.",
    price: 1600,
    location: "Hampi",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/hampi-ruins/800/600",
      filename: "hampi_ruins",
    },
  },
  {
    title: "Mahabalipuram Shore Temple Cottage",
    description: "A beachside cottage near the ancient Shore Temple, with rock-cut monuments, sea breeze, and fresh Tamil coastal food.",
    price: 2200,
    location: "Mahabalipuram",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/mahabalipuram-shore/800/600",
      filename: "mahabalipuram_shore",
    },
  },
  {
    title: "Kanyakumari Sunrise-Sunset Point Stay",
    description: "A stay at India's southern tip where the sea meets three oceans, famous for rare same-horizon sunrise and sunset views.",
    price: 1900,
    location: "Kanyakumari",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/kanyakumari-point/800/600",
      filename: "kanyakumari_point",
    },
  },
  {
    title: "Wayanad Forest Treehouse",
    description: "An elevated treehouse deep in Wayanad's forests, with spice plantation walks, waterfalls, and wildlife sanctuary visits nearby.",
    price: 2800,
    location: "Wayanad",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/wayanad-treehouse/800/600",
      filename: "wayanad_treehouse",
    },
  },
  {
    title: "Gokarna Cliffside Beach Hut",
    description: "A simple cliffside hut above Om Beach in Gokarna, known for its laid-back vibe, sea views, and quieter alternative to Goa.",
    price: 1400,
    location: "Gokarna",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/gokarna-beach/800/600",
      filename: "gokarna_beach",
    },
  },
  {
    title: "Mysore Palace-View Residence",
    description: "A heritage-style residence near Mysore Palace, with royal Karnataka architecture and easy access to Chamundi Hills.",
    price: 2300,
    location: "Mysore",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/mysore-palace/800/600",
      filename: "mysore_palace",
    },
  },
  {
    title: "Khajuraho Temple-Town Stay",
    description: "A peaceful stay minutes from the UNESCO-listed Khajuraho temples, showcasing Madhya Pradesh's finest medieval stone carving.",
    price: 2000,
    location: "Khajuraho",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/khajuraho-temple/800/600",
      filename: "khajuraho_temple",
    },
  },
  {
    title: "Bhopal Lake-View Apartment",
    description: "A comfortable apartment overlooking the Upper Lake in Bhopal, close to the old city's bazaars and the state's tech corridor.",
    price: 2100,
    location: "Bhopal",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/bhopal-lake/800/600",
      filename: "bhopal_lake",
    },
  },
  {
    title: "Pachmarhi Satpura Hill Cottage",
    description: "A forested hill cottage in Pachmarhi, Madhya Pradesh's only hill station, with waterfalls, caves, and Satpura range trekking.",
    price: 1900,
    location: "Pachmarhi",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/pachmarhi-hills/800/600",
      filename: "pachmarhi_hills",
    },
  },
  {
    title: "Kanha National Park Jungle Lodge",
    description: "A jungle-facing lodge near Kanha Tiger Reserve, offering safari bookings and views into one of India's finest wildlife parks.",
    price: 3400,
    location: "Kanha",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/kanha-jungle/800/600",
      filename: "kanha_jungle",
    },
  },
  {
    title: "Nashik Vineyard Farmstay",
    description: "A farmstay surrounded by Nashik's rolling vineyards, with wine-tasting tours and views of the Sahyadri hills.",
    price: 2500,
    location: "Nashik",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/nashik-vineyard/800/600",
      filename: "nashik_vineyard",
    },
  },
  {
    title: "Lonavala Monsoon Hill Villa",
    description: "A hillside villa near Lonavala famous for waterfall views during monsoon, with easy weekend access from Mumbai and Pune.",
    price: 3100,
    location: "Lonavala",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/lonavala-hills/800/600",
      filename: "lonavala_hills",
    },
  },
  {
    title: "Mahabaleshwar Strawberry Farm Stay",
    description: "A cottage surrounded by strawberry farms and dense forest in Mahabaleshwar, with viewpoints over the Western Ghats.",
    price: 2400,
    location: "Mahabaleshwar",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/mahabaleshwar-farm/800/600",
      filename: "mahabaleshwar_farm",
    },
  },
  {
    title: "Rann of Kutch White Desert Camp",
    description: "A tented camp on the edge of the White Rann, famous for moonlit desert views and the annual Rann Utsav festival.",
    price: 2700,
    location: "Kutch",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/kutch-desert/800/600",
      filename: "kutch_desert",
    },
  },
  {
    title: "Gangtok Mountain View Homestay",
    description: "A homestay in Gangtok with clear views of Kanchenjunga on good days, close to monasteries and Sikkim's mountain markets.",
    price: 2600,
    location: "Gangtok",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/gangtok-mountain/800/600",
      filename: "gangtok_mountain",
    },
  },
  {
    title: "Shillong Waterfall Cottage",
    description: "A cottage near Shillong's famous waterfalls and living root bridges, set in the lush, cloud-covered hills of Meghalaya.",
    price: 2300,
    location: "Shillong",
    country: "India",
    image: {
      url: "https://picsum.photos/seed/shillong-waterfall/800/600",
      filename: "shillong_waterfall",
    },
  },
];
 
module.exports = { data: sampleListings };
 