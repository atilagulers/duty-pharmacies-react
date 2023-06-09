const cities = [
  {SehirAd: 'İstanbul', SehirSlug: 'istanbul'},
  {SehirAd: 'Ankara', SehirSlug: 'ankara'},
  {SehirAd: 'İzmir', SehirSlug: 'izmir'},
  {SehirAd: 'Adana', SehirSlug: 'adana'},
  {SehirAd: 'Adıyaman', SehirSlug: 'adiyaman'},
  {SehirAd: 'Afyonkarahisar', SehirSlug: 'afyonkarahisar'},
  {SehirAd: 'Ağrı', SehirSlug: 'agri'},
  {SehirAd: 'Aksaray', SehirSlug: 'aksaray'},
  {SehirAd: 'Amasya', SehirSlug: 'amasya'},

  {SehirAd: 'Antalya', SehirSlug: 'antalya'},
  {SehirAd: 'Ardahan', SehirSlug: 'ardahan'},
  {SehirAd: 'Artvin', SehirSlug: 'artvin'},
  {SehirAd: 'Aydın', SehirSlug: 'aydin'},
  {SehirAd: 'Balıkesir', SehirSlug: 'balikesir'},
  {SehirAd: 'Bartın', SehirSlug: 'bartin'},
  {SehirAd: 'Batman', SehirSlug: 'batman'},
  {SehirAd: 'Bayburt', SehirSlug: 'bayburt'},
  {SehirAd: 'Bilecik', SehirSlug: 'bilecik'},
  {SehirAd: 'Bingöl', SehirSlug: 'bingol'},
  {SehirAd: 'Bitlis', SehirSlug: 'bitlis'},
  {SehirAd: 'Bolu', SehirSlug: 'bolu'},
  {SehirAd: 'Burdur', SehirSlug: 'burdur'},
  {SehirAd: 'Bursa', SehirSlug: 'bursa'},
  {SehirAd: 'Çanakkale', SehirSlug: 'canakkale'},
  {SehirAd: 'Çankırı', SehirSlug: 'cankiri'},
  {SehirAd: 'Çorum', SehirSlug: 'corum'},
  {SehirAd: 'Denizli', SehirSlug: 'denizli'},
  {SehirAd: 'Diyarbakır', SehirSlug: 'diyarbakir'},
  {SehirAd: 'Düzce', SehirSlug: 'duzce'},
  {SehirAd: 'Edirne', SehirSlug: 'edirne'},
  {SehirAd: 'Elazığ', SehirSlug: 'elazig'},
  {SehirAd: 'Erzincan', SehirSlug: 'erzincan'},
  {SehirAd: 'Erzurum', SehirSlug: 'erzurum'},
  {SehirAd: 'Eskişehir', SehirSlug: 'eskisehir'},
  {SehirAd: 'Gaziantep', SehirSlug: 'gaziantep'},
  {SehirAd: 'Giresun', SehirSlug: 'giresun'},
  {SehirAd: 'Gümüşhane', SehirSlug: 'gumushane'},
  {SehirAd: 'Hakkari', SehirSlug: 'hakkari'},
  {SehirAd: 'Hatay', SehirSlug: 'hatay'},
  {SehirAd: 'Iğdır', SehirSlug: 'igdir'},
  {SehirAd: 'Isparta', SehirSlug: 'isparta'},

  {SehirAd: 'Kahramanmaraş', SehirSlug: 'kahramanmaras'},
  {SehirAd: 'Karabük', SehirSlug: 'karabuk'},
  {SehirAd: 'Karaman', SehirSlug: 'karaman'},
  {SehirAd: 'Kars', SehirSlug: 'kars'},
  {SehirAd: 'Kastamonu', SehirSlug: 'kastamonu'},
  {SehirAd: 'Kayseri', SehirSlug: 'kayseri'},
  {SehirAd: 'Kırıkkale', SehirSlug: 'kirikkale'},
  {SehirAd: 'Kırklareli', SehirSlug: 'kirklareli'},
  {SehirAd: 'Kırşehir', SehirSlug: 'kirsehir'},
  {SehirAd: 'Kilis', SehirSlug: 'kilis'},
  {SehirAd: 'Kocaeli', SehirSlug: 'kocaeli'},
  {SehirAd: 'Konya', SehirSlug: 'konya'},
  {SehirAd: 'Kütahya', SehirSlug: 'kutahya'},
  {SehirAd: 'Malatya', SehirSlug: 'malatya'},
  {SehirAd: 'Manisa', SehirSlug: 'manisa'},
  {SehirAd: 'Mardin', SehirSlug: 'mardin'},
  {SehirAd: 'Mersin', SehirSlug: 'mersin'},
  {SehirAd: 'Muğla', SehirSlug: 'mugla'},
  {SehirAd: 'Muş', SehirSlug: 'mus'},
  {SehirAd: 'Nevşehir', SehirSlug: 'nevsehir'},
  {SehirAd: 'Niğde', SehirSlug: 'nigde'},
  {SehirAd: 'Ordu', SehirSlug: 'ordu'},
  {SehirAd: 'Osmaniye', SehirSlug: 'osmaniye'},
  {SehirAd: 'Rize', SehirSlug: 'rize'},
  {SehirAd: 'Sakarya', SehirSlug: 'sakarya'},
  {SehirAd: 'Samsun', SehirSlug: 'samsun'},
  {SehirAd: 'Siirt', SehirSlug: 'siirt'},
  {SehirAd: 'Sinop', SehirSlug: 'sinop'},
  {SehirAd: 'Sivas', SehirSlug: 'sivas'},
  {SehirAd: 'Şanlıurfa', SehirSlug: 'sanliurfa'},
  {SehirAd: 'Şırnak', SehirSlug: 'sirnak'},
  {SehirAd: 'Tekirdağ', SehirSlug: 'tekirdag'},
  {SehirAd: 'Tokat', SehirSlug: 'tokat'},
  {SehirAd: 'Trabzon', SehirSlug: 'trabzon'},
  {SehirAd: 'Tunceli', SehirSlug: 'tunceli'},
  {SehirAd: 'Uşak', SehirSlug: 'usak'},
  {SehirAd: 'Van', SehirSlug: 'van'},
  {SehirAd: 'Yalova', SehirSlug: 'yalova'},
  {SehirAd: 'Yozgat', SehirSlug: 'yozgat'},
  {SehirAd: 'Zonguldak', SehirSlug: 'zonguldak'},
  {SehirAd: 'Kıbrıs KKTC', SehirSlug: 'kibris'},
];

export default cities;
