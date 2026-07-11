export interface DestinationCity {
  name: string;
  url: string;
}

export interface DestinationCountry {
  region: string;
  country: string;
  overviewUrl: string | null;
  cities: DestinationCity[];
}

export interface DestinationRegion {
  region: string;
  countries: DestinationCountry[];
}

export const DESTINATION_TAXONOMY: DestinationRegion[] = [
  {
    "region": "AFRICA",
    "countries": [
      {
        "region": "AFRICA",
        "country": "Algeria",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/algeria",
        "cities": [
          {
            "name": "Algiers",
            "url": "https://www.lonelyplanet.com/destinations/algeria/algiers"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Botswana",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/botswana",
        "cities": [
          {
            "name": "Chobe National Park",
            "url": "https://www.lonelyplanet.com/destinations/botswana/northern-botswana/chobe-national-park"
          },
          {
            "name": "Gaborone",
            "url": "https://www.lonelyplanet.com/destinations/botswana/gaborone"
          },
          {
            "name": "Okavango Delta",
            "url": "https://www.lonelyplanet.com/destinations/botswana/okavango-delta"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Cabo Verde",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/cape-verde",
        "cities": [
          {
            "name": "Boa Vista",
            "url": "https://www.lonelyplanet.com/destinations/cabo-verde/boa-vista"
          },
          {
            "name": "Mindelo",
            "url": "https://www.lonelyplanet.com/destinations/cabo-verde/mindelo"
          },
          {
            "name": "Sal",
            "url": "https://www.lonelyplanet.com/destinations/cabo-verde/sal"
          },
          {
            "name": "Santo Antão",
            "url": "https://www.lonelyplanet.com/destinations/cabo-verde/santo-antao"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Côte d'Ivoire",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/cote-divoire",
        "cities": [
          {
            "name": "Abidjan",
            "url": "https://www.lonelyplanet.com/destinations/cote-divoire/abidjan"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Democratic Republic of Congo",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/democratic-republic-of-congo",
        "cities": [
          {
            "name": "Kinshasa",
            "url": "https://www.lonelyplanet.com/destinations/democratic-republic-of-congo/kinshasa"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Egypt",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/egypt",
        "cities": [
          {
            "name": "Alexandria",
            "url": "https://www.lonelyplanet.com/destinations/egypt/mediterranean-coast/alexandria"
          },
          {
            "name": "Aswan",
            "url": "https://www.lonelyplanet.com/destinations/egypt/nile-valley/aswan"
          },
          {
            "name": "Cairo",
            "url": "https://www.lonelyplanet.com/destinations/egypt/cairo"
          },
          {
            "name": "Dahab",
            "url": "https://www.lonelyplanet.com/destinations/egypt/sinai/dahab"
          },
          {
            "name": "El Gouna",
            "url": "https://www.lonelyplanet.com/destinations/egypt/el-gouna"
          },
          {
            "name": "Hurghada",
            "url": "https://www.lonelyplanet.com/destinations/egypt/red-sea-coast/hurghada"
          },
          {
            "name": "Luxor",
            "url": "https://www.lonelyplanet.com/destinations/egypt/nile-valley/luxor"
          },
          {
            "name": "Marsa Alam",
            "url": "https://www.lonelyplanet.com/destinations/egypt/red-sea-coast/marsa-alam"
          },
          {
            "name": "Nuweiba",
            "url": "https://www.lonelyplanet.com/destinations/egypt/sinai/nuweiba"
          },
          {
            "name": "Red Sea Coast",
            "url": "https://www.lonelyplanet.com/destinations/egypt/red-sea-coast"
          },
          {
            "name": "Sharm El Sheikh",
            "url": "https://www.lonelyplanet.com/destinations/egypt/sinai/sharm-el-sheikh-and-naama-bay"
          },
          {
            "name": "Siwa Oasis",
            "url": "https://www.lonelyplanet.com/destinations/egypt/western-desert/siwa-oasis"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Equatorial Guinea",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/equatorial-guinea",
        "cities": [
          {
            "name": "Bioko Island",
            "url": "https://www.lonelyplanet.com/destinations/equatorial-guinea/bioko-island"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Ethiopia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/ethiopia",
        "cities": [
          {
            "name": "Addis Ababa",
            "url": "https://www.lonelyplanet.com/destinations/ethiopia/addis-ababa"
          },
          {
            "name": "Lalibela",
            "url": "https://www.lonelyplanet.com/destinations/ethiopia/northern-ethiopia/lalibela"
          },
          {
            "name": "Simien Mountains National Park",
            "url": "https://www.lonelyplanet.com/destinations/ethiopia/northern-ethiopia/simien-mountains-national-park"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Gabon",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/gabon",
        "cities": [
          {
            "name": "Libreville",
            "url": "https://www.lonelyplanet.com/destinations/gabon/libreville"
          },
          {
            "name": "Loango National Park",
            "url": "https://www.lonelyplanet.com/destinations/gabon/southern-gabon/loango-national-park"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Ghana",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/ghana",
        "cities": [
          {
            "name": "Accra",
            "url": "https://www.lonelyplanet.com/destinations/ghana/accra"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Kenya",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/kenya",
        "cities": [
          {
            "name": "Amboseli National Park",
            "url": "https://www.lonelyplanet.com/destinations/kenya/southern-kenya/amboseli-national-park"
          },
          {
            "name": "Diani Beach",
            "url": "https://www.lonelyplanet.com/destinations/kenya/diani-beach"
          },
          {
            "name": "Lake Naivasha",
            "url": "https://www.lonelyplanet.com/destinations/kenya/the-rift-valley/lake-naivasha"
          },
          {
            "name": "Lake Nakuru National Park",
            "url": "https://www.lonelyplanet.com/destinations/kenya/the-rift-valley/lake-nakuru-national-park"
          },
          {
            "name": "Lamu Island",
            "url": "https://www.lonelyplanet.com/destinations/kenya/lamu-island"
          },
          {
            "name": "Malindi",
            "url": "https://www.lonelyplanet.com/destinations/kenya/the-coast/malindi"
          },
          {
            "name": "Masai Mara",
            "url": "https://www.lonelyplanet.com/destinations/kenya/masai-mara"
          },
          {
            "name": "Mombasa",
            "url": "https://www.lonelyplanet.com/destinations/kenya/the-coast/mombasa"
          },
          {
            "name": "Nairobi",
            "url": "https://www.lonelyplanet.com/destinations/kenya/nairobi"
          },
          {
            "name": "Tsavo West National Park",
            "url": "https://www.lonelyplanet.com/destinations/kenya/southern-kenya/tsavo-national-park"
          },
          {
            "name": "Wasini Island",
            "url": "https://www.lonelyplanet.com/destinations/kenya/wasini-island"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Madagascar",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/madagascar",
        "cities": [
          {
            "name": "Antananarivo",
            "url": "https://www.lonelyplanet.com/destinations/madagascar/antananarivo"
          },
          {
            "name": "Nosy Be",
            "url": "https://www.lonelyplanet.com/destinations/madagascar/northern-madagascar/nosy-be"
          },
          {
            "name": "Western Madagascar",
            "url": "https://www.lonelyplanet.com/destinations/madagascar/western-madagascar"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Malawi",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/malawi",
        "cities": [
          {
            "name": "Lilongwe",
            "url": "https://www.lonelyplanet.com/destinations/malawi/lilongwe"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Mauritius",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/mauritius",
        "cities": [
          {
            "name": "Black River Gorges National Park",
            "url": "https://www.lonelyplanet.com/destinations/mauritius/central-mauritius/black-river-gorges-national-park"
          },
          {
            "name": "Chamarel",
            "url": "https://www.lonelyplanet.com/destinations/mauritius/chamarel"
          },
          {
            "name": "Flic en Flac",
            "url": "https://www.lonelyplanet.com/destinations/mauritius/west-mauritius/flic-en-flac-and-around"
          },
          {
            "name": "Grand Baie",
            "url": "https://www.lonelyplanet.com/destinations/mauritius/north-mauritius/grand-baie"
          },
          {
            "name": "Port Louis",
            "url": "https://www.lonelyplanet.com/destinations/mauritius/port-louis"
          },
          {
            "name": "Rodrigues",
            "url": "https://www.lonelyplanet.com/destinations/mauritius/rodrigues"
          },
          {
            "name": "The North",
            "url": "https://www.lonelyplanet.com/destinations/mauritius/north-mauritius"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Morocco",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/morocco",
        "cities": [
          {
            "name": "Agadir",
            "url": "https://www.lonelyplanet.com/destinations/morocco/the-atlantic-coast/agadir"
          },
          {
            "name": "Agafay Desert",
            "url": "https://www.lonelyplanet.com/destinations/morocco/agafay-desert"
          },
          {
            "name": "Ait Ben Haddou",
            "url": "https://www.lonelyplanet.com/destinations/morocco/ait-ben-haddou"
          },
          {
            "name": "Anti Atlas Mountains",
            "url": "https://www.lonelyplanet.com/destinations/morocco/anti-atlas-mountains"
          },
          {
            "name": "Asilah",
            "url": "https://www.lonelyplanet.com/destinations/morocco/the-atlantic-coast/asilah"
          },
          {
            "name": "Casablanca",
            "url": "https://www.lonelyplanet.com/destinations/morocco/casablanca"
          },
          {
            "name": "Central Morocco",
            "url": "https://www.lonelyplanet.com/destinations/morocco/central-morocco"
          },
          {
            "name": "Ceuta",
            "url": "https://www.lonelyplanet.com/destinations/morocco/the-mediterranean-coast-and-the-rif/ceuta-sebta"
          },
          {
            "name": "Chefchaouen",
            "url": "https://www.lonelyplanet.com/destinations/morocco/the-mediterranean-coast-and-the-rif/chefchaouen"
          },
          {
            "name": "Dadès Gorge",
            "url": "https://www.lonelyplanet.com/destinations/morocco/dades-gorge"
          },
          {
            "name": "Dadès Valley",
            "url": "https://www.lonelyplanet.com/destinations/morocco/dades-valley"
          },
          {
            "name": "Dakhla",
            "url": "https://www.lonelyplanet.com/destinations/morocco/dakhla"
          },
          {
            "name": "Draa Valley",
            "url": "https://www.lonelyplanet.com/destinations/morocco/central-morocco-and-the-atlas-mountains/draa-valley"
          },
          {
            "name": "Essaouira",
            "url": "https://www.lonelyplanet.com/destinations/morocco/the-atlantic-coast/essaouira"
          },
          {
            "name": "Fez",
            "url": "https://www.lonelyplanet.com/destinations/morocco/the-mediterranean-coast-and-the-rif/fes"
          },
          {
            "name": "High Atlas Mountains",
            "url": "https://www.lonelyplanet.com/destinations/morocco/high-atlas-mountains"
          },
          {
            "name": "Imlil",
            "url": "https://www.lonelyplanet.com/destinations/morocco/imlil"
          },
          {
            "name": "Marrakesh",
            "url": "https://www.lonelyplanet.com/destinations/morocco/marrakesh"
          },
          {
            "name": "Mediterranean Coast & the Rif Mountains",
            "url": "https://www.lonelyplanet.com/destinations/morocco/the-mediterranean-coast-and-the-rif"
          },
          {
            "name": "Meknes",
            "url": "https://www.lonelyplanet.com/destinations/morocco/the-mediterranean-coast-and-the-rif/meknes"
          },
          {
            "name": "Melilla",
            "url": "https://www.lonelyplanet.com/destinations/morocco/the-mediterranean-coast-and-the-rif/melilla"
          },
          {
            "name": "Merzouga",
            "url": "https://www.lonelyplanet.com/destinations/morocco/central-morocco-and-the-atlas-mountains/merzouga-and-the-dunes"
          },
          {
            "name": "Middle Atlas",
            "url": "https://www.lonelyplanet.com/destinations/morocco/middle-atlas-1331531"
          },
          {
            "name": "Midelt",
            "url": "https://www.lonelyplanet.com/destinations/morocco/midelt"
          },
          {
            "name": "Mirleft",
            "url": "https://www.lonelyplanet.com/destinations/morocco/mirleft"
          },
          {
            "name": "Moulay Idriss Zerhoun",
            "url": "https://www.lonelyplanet.com/destinations/morocco/moulay-idriss"
          },
          {
            "name": "Northern Atlantic Coast",
            "url": "https://www.lonelyplanet.com/destinations/morocco/the-atlantic-coast"
          },
          {
            "name": "Ouarzazate",
            "url": "https://www.lonelyplanet.com/destinations/morocco/ouarzazate"
          },
          {
            "name": "Oujda",
            "url": "https://www.lonelyplanet.com/destinations/morocco/oujda"
          },
          {
            "name": "Ourika Valley",
            "url": "https://www.lonelyplanet.com/destinations/morocco/ourika-valley"
          },
          {
            "name": "Rabat",
            "url": "https://www.lonelyplanet.com/destinations/morocco/rabat"
          },
          {
            "name": "Rif Mountains",
            "url": "https://www.lonelyplanet.com/destinations/morocco/rif-mountains"
          },
          {
            "name": "Safi",
            "url": "https://www.lonelyplanet.com/destinations/morocco/safi"
          },
          {
            "name": "Sidi Ifni",
            "url": "https://www.lonelyplanet.com/destinations/morocco/sidi-ifni"
          },
          {
            "name": "Skoura",
            "url": "https://www.lonelyplanet.com/destinations/morocco/skoura"
          },
          {
            "name": "Souss-Massa National Park",
            "url": "https://www.lonelyplanet.com/destinations/morocco/souss-massa-national-park"
          },
          {
            "name": "Southern Morocco & Western Sahara",
            "url": "https://www.lonelyplanet.com/destinations/morocco/southern-morocco-western-sahara"
          },
          {
            "name": "Tafraoute",
            "url": "https://www.lonelyplanet.com/destinations/morocco/the-atlantic-coast/tafraoute"
          },
          {
            "name": "Taghazout",
            "url": "https://www.lonelyplanet.com/destinations/morocco/taghazout"
          },
          {
            "name": "Talassemtane National Park",
            "url": "https://www.lonelyplanet.com/destinations/morocco/talassemtane-national-park"
          },
          {
            "name": "Tangier",
            "url": "https://www.lonelyplanet.com/destinations/morocco/the-mediterranean-coast-and-the-rif/tangier"
          },
          {
            "name": "Taroudant",
            "url": "https://www.lonelyplanet.com/destinations/morocco/the-atlantic-coast/taroudannt"
          },
          {
            "name": "Tazekka National Park",
            "url": "https://www.lonelyplanet.com/destinations/morocco/middle-atlas/tazekka-national-park"
          },
          {
            "name": "Tetouan",
            "url": "https://www.lonelyplanet.com/destinations/morocco/the-mediterranean-coast-and-the-rif/tetouan"
          },
          {
            "name": "Todra Gorge",
            "url": "https://www.lonelyplanet.com/destinations/morocco/central-morocco-and-the-atlas-mountains/todra-gorge-and-tinerhir"
          },
          {
            "name": "Toubkal National Park",
            "url": "https://www.lonelyplanet.com/destinations/morocco/toubkal-national-park"
          },
          {
            "name": "Western Sahara",
            "url": "https://www.lonelyplanet.com/destinations/morocco/western-sahara"
          },
          {
            "name": "Ziz Valley & the Tafilalt",
            "url": "https://www.lonelyplanet.com/destinations/morocco/ziz-valley-the-tafilalt"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Mozambique",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/mozambique",
        "cities": [
          {
            "name": "Bazaruto Archipelago",
            "url": "https://www.lonelyplanet.com/destinations/mozambique/bazaruto-archipelago"
          },
          {
            "name": "Maputo",
            "url": "https://www.lonelyplanet.com/destinations/mozambique/maputo"
          },
          {
            "name": "Pemba",
            "url": "https://www.lonelyplanet.com/destinations/mozambique/northern-mozambique/pemba"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Nigeria",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/nigeria",
        "cities": [
          {
            "name": "Lagos",
            "url": "https://www.lonelyplanet.com/destinations/nigeria/lagos"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Republic of Congo",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/congo",
        "cities": [
          {
            "name": "Brazzaville",
            "url": "https://www.lonelyplanet.com/destinations/congo/brazzaville"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Rwanda",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/rwanda",
        "cities": [
          {
            "name": "Kigali",
            "url": "https://www.lonelyplanet.com/destinations/rwanda/kigali"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Senegal",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/senegal",
        "cities": [
          {
            "name": "Dakar",
            "url": "https://www.lonelyplanet.com/destinations/senegal/dakar"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Seychelles",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/seychelles",
        "cities": [
          {
            "name": "La Digue",
            "url": "https://www.lonelyplanet.com/destinations/seychelles/la-digue"
          },
          {
            "name": "Mahé",
            "url": "https://www.lonelyplanet.com/destinations/seychelles/mahe"
          },
          {
            "name": "Morne Seychellois National Park",
            "url": "https://www.lonelyplanet.com/destinations/seychelles/mahe/morne-seychellois-national-park"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Sierra Leone",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/sierra-leone",
        "cities": [
          {
            "name": "Gola Rainforest National Park",
            "url": "https://www.lonelyplanet.com/destinations/sierra-leone/gola-rainforest-national-park"
          },
          {
            "name": "Outamba-Kilimi National Park",
            "url": "https://www.lonelyplanet.com/destinations/sierra-leone/northern-sierra-leone/outamba-kilimi-national-park"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Sudan",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/sudan",
        "cities": [
          {
            "name": "Khartoum",
            "url": "https://www.lonelyplanet.com/destinations/sudan/khartoum"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "São Tomé & Príncipe",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/sao-tome-and-principe",
        "cities": [
          {
            "name": "São Tomé",
            "url": "https://www.lonelyplanet.com/destinations/sao-tome-principe/sao-tome"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Tanzania",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/tanzania",
        "cities": [
          {
            "name": "Arusha",
            "url": "https://www.lonelyplanet.com/destinations/tanzania/northern-tanzania/arusha"
          },
          {
            "name": "Dar es Salaam",
            "url": "https://www.lonelyplanet.com/destinations/tanzania/dar-es-salaam"
          },
          {
            "name": "Lake Manyara National Park",
            "url": "https://www.lonelyplanet.com/destinations/tanzania/northern-tanzania/lake-manyara-national-park"
          },
          {
            "name": "Mikumi National Park",
            "url": "https://www.lonelyplanet.com/destinations/tanzania/southern-tanzania/mikumi-national-park"
          },
          {
            "name": "Mt Kilimanjaro National Park",
            "url": "https://www.lonelyplanet.com/destinations/tanzania/mount-kilimanjaro"
          },
          {
            "name": "Mwanza",
            "url": "https://www.lonelyplanet.com/destinations/tanzania/northern-tanzania/mwanza"
          },
          {
            "name": "Northern Tanzania",
            "url": "https://www.lonelyplanet.com/destinations/tanzania/northern-tanzania"
          },
          {
            "name": "Serengeti National Park",
            "url": "https://www.lonelyplanet.com/destinations/tanzania/northern-tanzania/serengeti-national-park"
          },
          {
            "name": "Tarangire National Park",
            "url": "https://www.lonelyplanet.com/destinations/tanzania/northern-tanzania/tarangire-national-park"
          },
          {
            "name": "Zanzibar Archipelago",
            "url": "https://www.lonelyplanet.com/destinations/tanzania/zanzibar-archipelago"
          },
          {
            "name": "Zanzibar Island",
            "url": "https://www.lonelyplanet.com/destinations/tanzania/zanzibar-island"
          },
          {
            "name": "Zanzibar Town",
            "url": "https://www.lonelyplanet.com/destinations/tanzania/zanzibar-archipelago/zanzibar-unguja"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "The Gambia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/the-gambia",
        "cities": [
          {
            "name": "Banjul",
            "url": "https://www.lonelyplanet.com/destinations/the-gambia/banjul"
          },
          {
            "name": "Baobolong Wetland Reserve & Kiang West National Park",
            "url": "https://www.lonelyplanet.com/destinations/the-gambia/lower-gambia-river/kiang-west-national-park"
          },
          {
            "name": "Serekunda & Atlantic Coast Resorts",
            "url": "https://www.lonelyplanet.com/destinations/the-gambia/serekunda-and-the-atlantic-coast"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Togo",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/togo",
        "cities": [
          {
            "name": "Lomé",
            "url": "https://www.lonelyplanet.com/destinations/togo/lome"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Tunisia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/tunisia",
        "cities": [
          {
            "name": "Cap Bon",
            "url": "https://www.lonelyplanet.com/destinations/tunisia/cap-bon"
          },
          {
            "name": "Djerba",
            "url": "https://www.lonelyplanet.com/destinations/tunisia/southern-tunisia/jerba-and-houmt-souq"
          },
          {
            "name": "Hammamet",
            "url": "https://www.lonelyplanet.com/destinations/tunisia/hammamet"
          },
          {
            "name": "Northern Tunisia",
            "url": "https://www.lonelyplanet.com/destinations/tunisia/northern-tunisia"
          },
          {
            "name": "Sousse",
            "url": "https://www.lonelyplanet.com/destinations/tunisia/central-tunisia/sousse"
          },
          {
            "name": "Southern Tunisia",
            "url": "https://www.lonelyplanet.com/destinations/tunisia/southern-tunisia-1331902"
          },
          {
            "name": "Tunis",
            "url": "https://www.lonelyplanet.com/destinations/tunisia/tunis"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Uganda",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/uganda",
        "cities": [
          {
            "name": "Kampala",
            "url": "https://www.lonelyplanet.com/destinations/uganda/kampala"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Zambia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/zambia",
        "cities": [
          {
            "name": "Lusaka",
            "url": "https://www.lonelyplanet.com/destinations/zambia/lusaka"
          }
        ]
      },
      {
        "region": "AFRICA",
        "country": "Zimbabwe",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/zimbabwe",
        "cities": [
          {
            "name": "Harare",
            "url": "https://www.lonelyplanet.com/destinations/zimbabwe/harare"
          },
          {
            "name": "Matobo National Park",
            "url": "https://www.lonelyplanet.com/destinations/zimbabwe/western-zimbabwe/matobo-national-park"
          },
          {
            "name": "Victoria Falls (town)",
            "url": "https://www.lonelyplanet.com/destinations/zimbabwe/victoria-falls-town"
          }
        ]
      }
    ]
  },
  {
    "region": "ASIA",
    "countries": [
      {
        "region": "ASIA",
        "country": "Afghanistan",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/afghanistan",
        "cities": [
          {
            "name": "Kabul",
            "url": "https://www.lonelyplanet.com/destinations/afghanistan/kabul"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "Bangladesh",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/bangladesh",
        "cities": [
          {
            "name": "Dhaka",
            "url": "https://www.lonelyplanet.com/destinations/bangladesh/dhaka"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "Bhutan",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/bhutan",
        "cities": [
          {
            "name": "Thimphu",
            "url": "https://www.lonelyplanet.com/destinations/bhutan/thimphu"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "Cambodia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/cambodia",
        "cities": [
          {
            "name": "Angkor Wat",
            "url": "https://www.lonelyplanet.com/destinations/cambodia/angkor-wat"
          },
          {
            "name": "Battambang",
            "url": "https://www.lonelyplanet.com/destinations/cambodia/northwestern-cambodia/battambang"
          },
          {
            "name": "Kampot",
            "url": "https://www.lonelyplanet.com/destinations/cambodia/south-coast/kampot"
          },
          {
            "name": "Kep",
            "url": "https://www.lonelyplanet.com/destinations/cambodia/south-coast/kep"
          },
          {
            "name": "Koh Rong",
            "url": "https://www.lonelyplanet.com/destinations/cambodia/koh-rong"
          },
          {
            "name": "Kratie",
            "url": "https://www.lonelyplanet.com/destinations/cambodia/northeastern-cambodia/kratie"
          },
          {
            "name": "Mondulkiri Province",
            "url": "https://www.lonelyplanet.com/destinations/cambodia/northeastern-cambodia/mondulkiri-province"
          },
          {
            "name": "Phnom Penh",
            "url": "https://www.lonelyplanet.com/destinations/cambodia/phnom-penh"
          },
          {
            "name": "Siem Reap",
            "url": "https://www.lonelyplanet.com/destinations/cambodia/siem-reap"
          },
          {
            "name": "Sihanoukville",
            "url": "https://www.lonelyplanet.com/destinations/cambodia/south-coast/sihanoukville"
          },
          {
            "name": "South Coast",
            "url": "https://www.lonelyplanet.com/destinations/cambodia/south-coast"
          },
          {
            "name": "Temples of Angkor",
            "url": "https://www.lonelyplanet.com/destinations/cambodia/temples-of-angkor"
          },
          {
            "name": "The Southern Islands",
            "url": "https://www.lonelyplanet.com/destinations/cambodia/the-southern-islands"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "China",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/china",
        "cities": [
          {
            "name": "Beijing",
            "url": "https://www.lonelyplanet.com/destinations/china/beijing"
          },
          {
            "name": "Changsha",
            "url": "https://www.lonelyplanet.com/destinations/china/hunan/changsha"
          },
          {
            "name": "Chengdu",
            "url": "https://www.lonelyplanet.com/destinations/china/sichuan/chengdu"
          },
          {
            "name": "Chongqing City",
            "url": "https://www.lonelyplanet.com/destinations/china/chongqing"
          },
          {
            "name": "Dali",
            "url": "https://www.lonelyplanet.com/destinations/china/yunnan/dali"
          },
          {
            "name": "Dalian",
            "url": "https://www.lonelyplanet.com/destinations/china/liaoning/dalian"
          },
          {
            "name": "Dunhuang",
            "url": "https://www.lonelyplanet.com/destinations/china/gansu/dunhuang"
          },
          {
            "name": "Fujian",
            "url": "https://www.lonelyplanet.com/destinations/china/fujian"
          },
          {
            "name": "Gansu",
            "url": "https://www.lonelyplanet.com/destinations/china/gansu"
          },
          {
            "name": "Guangdong",
            "url": "https://www.lonelyplanet.com/destinations/china/guangdong"
          },
          {
            "name": "Guangxi",
            "url": "https://www.lonelyplanet.com/destinations/china/guangxi"
          },
          {
            "name": "Guangzhou",
            "url": "https://www.lonelyplanet.com/destinations/china/guangdong/guangzhou"
          },
          {
            "name": "Guilin",
            "url": "https://www.lonelyplanet.com/destinations/china/guangxi/guilin"
          },
          {
            "name": "Guiyang",
            "url": "https://www.lonelyplanet.com/destinations/china/guizhou/guiyang"
          },
          {
            "name": "Guizhou",
            "url": "https://www.lonelyplanet.com/destinations/china/guizhou"
          },
          {
            "name": "Hainan",
            "url": "https://www.lonelyplanet.com/destinations/china/hainan"
          },
          {
            "name": "Hangzhou",
            "url": "https://www.lonelyplanet.com/destinations/china/zhejiang/hangzhou"
          },
          {
            "name": "Harbin",
            "url": "https://www.lonelyplanet.com/destinations/china/heilongjiang/haerbin"
          },
          {
            "name": "Heilongjiang",
            "url": "https://www.lonelyplanet.com/destinations/china/heilongjiang"
          },
          {
            "name": "Hong Kong",
            "url": "https://www.lonelyplanet.com/destinations/china/hong-kong"
          },
          {
            "name": "Hunan",
            "url": "https://www.lonelyplanet.com/destinations/china/hunan"
          },
          {
            "name": "Inner Mongolia",
            "url": "https://www.lonelyplanet.com/destinations/china/inner-mongolia"
          },
          {
            "name": "Jiangsu",
            "url": "https://www.lonelyplanet.com/destinations/china/jiangsu"
          },
          {
            "name": "Kashgar",
            "url": "https://www.lonelyplanet.com/destinations/china/xinjiang/kashgar"
          },
          {
            "name": "Kunming",
            "url": "https://www.lonelyplanet.com/destinations/china/yunnan/kunming"
          },
          {
            "name": "Lhasa",
            "url": "https://www.lonelyplanet.com/destinations/china/tibet/lhasa"
          },
          {
            "name": "Lijiang",
            "url": "https://www.lonelyplanet.com/destinations/china/yunnan/lijiang"
          },
          {
            "name": "Macau",
            "url": "https://www.lonelyplanet.com/destinations/china/macau"
          },
          {
            "name": "Nanjing",
            "url": "https://www.lonelyplanet.com/destinations/china/jiangsu/nanjing"
          },
          {
            "name": "Qingdao",
            "url": "https://www.lonelyplanet.com/destinations/china/shandong/qingdao"
          },
          {
            "name": "Qinghai",
            "url": "https://www.lonelyplanet.com/destinations/china/qinghai"
          },
          {
            "name": "Sanya",
            "url": "https://www.lonelyplanet.com/destinations/china/hainan/sanya"
          },
          {
            "name": "Shandong",
            "url": "https://www.lonelyplanet.com/destinations/china/shandong"
          },
          {
            "name": "Shanghai",
            "url": "https://www.lonelyplanet.com/destinations/china/shanghai"
          },
          {
            "name": "Shangri-la",
            "url": "https://www.lonelyplanet.com/destinations/china/yunnan/shangri-la-zhongdian"
          },
          {
            "name": "Shanxi",
            "url": "https://www.lonelyplanet.com/destinations/china/shanxi"
          },
          {
            "name": "Shenzhen",
            "url": "https://www.lonelyplanet.com/destinations/china/guangdong/shenzhen"
          },
          {
            "name": "Sichuan",
            "url": "https://www.lonelyplanet.com/destinations/china/sichuan"
          },
          {
            "name": "Suzhou",
            "url": "https://www.lonelyplanet.com/destinations/china/jiangsu/suzhou"
          },
          {
            "name": "The Great Wall",
            "url": "https://www.lonelyplanet.com/destinations/china/the-great-wall"
          },
          {
            "name": "Tianjin",
            "url": "https://www.lonelyplanet.com/destinations/china/tianjin"
          },
          {
            "name": "Tiger Leaping Gorge",
            "url": "https://www.lonelyplanet.com/destinations/china/yunnan/tiger-leaping-gorge"
          },
          {
            "name": "Wuhan",
            "url": "https://www.lonelyplanet.com/destinations/china/hubei/wuhan"
          },
          {
            "name": "Xiamen",
            "url": "https://www.lonelyplanet.com/destinations/china/fujian/xiamen"
          },
          {
            "name": "Xi'an",
            "url": "https://www.lonelyplanet.com/destinations/china/shaanxi-shanxi/xian"
          },
          {
            "name": "Xinjiang",
            "url": "https://www.lonelyplanet.com/destinations/china/xinjiang"
          },
          {
            "name": "Xishuangbanna Region",
            "url": "https://www.lonelyplanet.com/destinations/china/yunnan/xishuangbanna-region"
          },
          {
            "name": "Yangshuo",
            "url": "https://www.lonelyplanet.com/destinations/china/guangxi/yangshuo"
          },
          {
            "name": "Yunnan",
            "url": "https://www.lonelyplanet.com/destinations/china/yunnan"
          },
          {
            "name": "Zhangjiajie",
            "url": "https://www.lonelyplanet.com/destinations/china/hunan/wulingyuan-and-zhangjiajie"
          },
          {
            "name": "Zhejiang",
            "url": "https://www.lonelyplanet.com/destinations/china/zhejiang"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "India",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/india",
        "cities": [
          {
            "name": "Agra",
            "url": "https://www.lonelyplanet.com/destinations/india/uttar-pradesh/agra"
          },
          {
            "name": "Agra & the Taj Mahal",
            "url": "https://www.lonelyplanet.com/destinations/india/uttar-pradesh/agra-the-taj-mahal"
          },
          {
            "name": "Ahmedabad (Amdavad)",
            "url": "https://www.lonelyplanet.com/destinations/india/gujarat/ahmedabad-amdavad"
          },
          {
            "name": "Alappuzha (Alleppey)",
            "url": "https://www.lonelyplanet.com/destinations/india/kerala/alappuzha-alleppey"
          },
          {
            "name": "Amritsar",
            "url": "https://www.lonelyplanet.com/destinations/india/punjab-and-haryana/amritsar"
          },
          {
            "name": "Andaman Islands",
            "url": "https://www.lonelyplanet.com/destinations/india/andaman-and-nicobar-islands"
          },
          {
            "name": "Arunachal Pradesh",
            "url": "https://www.lonelyplanet.com/destinations/india/northeast-states/arunachal-pradesh"
          },
          {
            "name": "Assam",
            "url": "https://www.lonelyplanet.com/destinations/india/northeast-states/assam"
          },
          {
            "name": "Bengaluru (Bangalore)",
            "url": "https://www.lonelyplanet.com/destinations/india/bengaluru-bangalore"
          },
          {
            "name": "Chandigarh",
            "url": "https://www.lonelyplanet.com/destinations/india/punjab-and-haryana/chandigarh"
          },
          {
            "name": "Chennai (Madras)",
            "url": "https://www.lonelyplanet.com/destinations/india/tamil-nadu/chennai-madras"
          },
          {
            "name": "Darjeeling",
            "url": "https://www.lonelyplanet.com/destinations/india/west-bengal/darjeeling"
          },
          {
            "name": "Delhi",
            "url": "https://www.lonelyplanet.com/destinations/india/delhi"
          },
          {
            "name": "Dharamsala",
            "url": "https://www.lonelyplanet.com/destinations/india/dharamsala"
          },
          {
            "name": "Diu",
            "url": "https://www.lonelyplanet.com/destinations/india/gujarat/diu"
          },
          {
            "name": "Eastern Rajasthan",
            "url": "https://www.lonelyplanet.com/destinations/india/rajasthan/eastern-rajasthan"
          },
          {
            "name": "Fatehpur Sikri",
            "url": "https://www.lonelyplanet.com/destinations/india/uttar-pradesh/fatehpur-sikri"
          },
          {
            "name": "Goa",
            "url": "https://www.lonelyplanet.com/destinations/india/goa"
          },
          {
            "name": "Gujarat & Diu",
            "url": "https://www.lonelyplanet.com/destinations/india/gujarat"
          },
          {
            "name": "Guwahati",
            "url": "https://www.lonelyplanet.com/destinations/india/northeast-states/guwahati"
          },
          {
            "name": "Hampi",
            "url": "https://www.lonelyplanet.com/destinations/india/karnataka/hampi"
          },
          {
            "name": "Haridwar",
            "url": "https://www.lonelyplanet.com/destinations/india/uttarakhand-uttaranchal/haridwar"
          },
          {
            "name": "Havelock Island (Swaraj Dweep)",
            "url": "https://www.lonelyplanet.com/destinations/india/andaman-and-nicobar-islands/havelock-island"
          },
          {
            "name": "Himachal Pradesh",
            "url": "https://www.lonelyplanet.com/destinations/india/himachal-pradesh"
          },
          {
            "name": "Hyderabad",
            "url": "https://www.lonelyplanet.com/destinations/india/andhra-pradesh/hyderabad-and-secunderabad"
          },
          {
            "name": "Jaipur",
            "url": "https://www.lonelyplanet.com/destinations/india/rajasthan/jaipur"
          },
          {
            "name": "Jaisalmer",
            "url": "https://www.lonelyplanet.com/destinations/india/rajasthan/jaisalmer"
          },
          {
            "name": "Jodhpur",
            "url": "https://www.lonelyplanet.com/destinations/india/rajasthan/jodhpur"
          },
          {
            "name": "Kannur",
            "url": "https://www.lonelyplanet.com/destinations/india/kerala/kannur-cannanore"
          },
          {
            "name": "Karnataka",
            "url": "https://www.lonelyplanet.com/destinations/india/karnataka"
          },
          {
            "name": "Kashmir & Ladakh",
            "url": "https://www.lonelyplanet.com/destinations/india/jammu-and-kashmir"
          },
          {
            "name": "Kerala",
            "url": "https://www.lonelyplanet.com/destinations/india/kerala"
          },
          {
            "name": "Khajuraho",
            "url": "https://www.lonelyplanet.com/destinations/india/madhya-pradesh-and-chhattisgarh/khajuraho"
          },
          {
            "name": "Kochi (Cochin)",
            "url": "https://www.lonelyplanet.com/destinations/india/kerala/kochi-cochin"
          },
          {
            "name": "Kolkata (Calcutta)",
            "url": "https://www.lonelyplanet.com/destinations/india/kolkata-calcutta"
          },
          {
            "name": "Kovalam",
            "url": "https://www.lonelyplanet.com/destinations/india/kerala/kovalam"
          },
          {
            "name": "Ladakh",
            "url": "https://www.lonelyplanet.com/destinations/india/jammu-and-kashmir/ladakh"
          },
          {
            "name": "Leh",
            "url": "https://www.lonelyplanet.com/destinations/india/jammu-and-kashmir/leh"
          },
          {
            "name": "Lucknow",
            "url": "https://www.lonelyplanet.com/destinations/india/uttar-pradesh/lucknow"
          },
          {
            "name": "Madhya Pradesh & Chhattisgarh",
            "url": "https://www.lonelyplanet.com/destinations/india/madhya-pradesh-and-chhattisgarh"
          },
          {
            "name": "Madurai",
            "url": "https://www.lonelyplanet.com/destinations/india/tamil-nadu/madurai"
          },
          {
            "name": "Maharashtra",
            "url": "https://www.lonelyplanet.com/destinations/india/maharashtra"
          },
          {
            "name": "Mamallapuram (Mahabalipuram)",
            "url": "https://www.lonelyplanet.com/destinations/india/tamil-nadu/mamallapuram-mahabalipuram"
          },
          {
            "name": "Manali",
            "url": "https://www.lonelyplanet.com/destinations/india/himachal-pradesh/manali"
          },
          {
            "name": "Mangaluru (Mangalore)",
            "url": "https://www.lonelyplanet.com/destinations/india/karnataka/mangalore"
          },
          {
            "name": "Mcleod Ganj",
            "url": "https://www.lonelyplanet.com/destinations/india/himachal-pradesh/mcleod-ganj"
          },
          {
            "name": "Meghalaya",
            "url": "https://www.lonelyplanet.com/destinations/india/northeast-states/meghalaya"
          },
          {
            "name": "Mumbai (Bombay)",
            "url": "https://www.lonelyplanet.com/destinations/india/mumbai-bombay"
          },
          {
            "name": "Munnar",
            "url": "https://www.lonelyplanet.com/destinations/india/kerala/munnar"
          },
          {
            "name": "Mussoorie",
            "url": "https://www.lonelyplanet.com/destinations/india/uttarakhand-uttaranchal/mussoorie"
          },
          {
            "name": "Mysuru (Mysore)",
            "url": "https://www.lonelyplanet.com/destinations/india/karnataka/mysore"
          },
          {
            "name": "Nagaland",
            "url": "https://www.lonelyplanet.com/destinations/india/northeast-states/nagaland"
          },
          {
            "name": "Nashik",
            "url": "https://www.lonelyplanet.com/destinations/india/maharashtra/nasik"
          },
          {
            "name": "Northeast States",
            "url": "https://www.lonelyplanet.com/destinations/india/northeast-states"
          },
          {
            "name": "Northern Kerala",
            "url": "https://www.lonelyplanet.com/destinations/india/kerala/northern-kerala"
          },
          {
            "name": "Odisha",
            "url": "https://www.lonelyplanet.com/destinations/india/orissa"
          },
          {
            "name": "Ooty (Udhagamandalam)",
            "url": "https://www.lonelyplanet.com/destinations/india/tamil-nadu/ooty-udhagamandalam"
          },
          {
            "name": "Orchha",
            "url": "https://www.lonelyplanet.com/destinations/india/madhya-pradesh-and-chhattisgarh/orchha"
          },
          {
            "name": "Panaji",
            "url": "https://www.lonelyplanet.com/destinations/india/goa/panaji-panjim"
          },
          {
            "name": "Puducherry (Pondicherry)",
            "url": "https://www.lonelyplanet.com/destinations/india/tamil-nadu/puducherry-pondicherry"
          },
          {
            "name": "Pune",
            "url": "https://www.lonelyplanet.com/destinations/india/maharashtra/pune"
          },
          {
            "name": "Punjab & Haryana",
            "url": "https://www.lonelyplanet.com/destinations/india/punjab-and-haryana"
          },
          {
            "name": "Punjab (India)",
            "url": "https://www.lonelyplanet.com/destinations/india/punjab-and-haryana/punjab"
          },
          {
            "name": "Puri",
            "url": "https://www.lonelyplanet.com/destinations/india/orissa/puri"
          },
          {
            "name": "Pushkar",
            "url": "https://www.lonelyplanet.com/destinations/india/rajasthan/pushkar"
          },
          {
            "name": "Rajasthan",
            "url": "https://www.lonelyplanet.com/destinations/india/rajasthan"
          },
          {
            "name": "Ranthambhore National Park",
            "url": "https://www.lonelyplanet.com/destinations/india/rajasthan/ranthambore-national-park"
          },
          {
            "name": "Rishikesh",
            "url": "https://www.lonelyplanet.com/destinations/india/uttarakhand-uttaranchal/rishikesh"
          },
          {
            "name": "Shimla",
            "url": "https://www.lonelyplanet.com/destinations/india/himachal-pradesh/shimla"
          },
          {
            "name": "Sikkim",
            "url": "https://www.lonelyplanet.com/destinations/india/sikkim"
          },
          {
            "name": "Siliguri & New Jalpaiguri",
            "url": "https://www.lonelyplanet.com/destinations/india/west-bengal/siliguri-and-new-jalpaiguri"
          },
          {
            "name": "South India",
            "url": "https://www.lonelyplanet.com/destinations/india/south-india"
          },
          {
            "name": "Srinagar",
            "url": "https://www.lonelyplanet.com/destinations/india/jammu-and-kashmir/srinagar"
          },
          {
            "name": "Srinagar & the Kashmir Valley",
            "url": "https://www.lonelyplanet.com/destinations/india/jammu-and-kashmir/jammu-and-the-kashmir-valley"
          },
          {
            "name": "Tamil Nadu",
            "url": "https://www.lonelyplanet.com/destinations/india/tamil-nadu"
          },
          {
            "name": "The Western Ghats",
            "url": "https://www.lonelyplanet.com/destinations/india/tamil-nadu/the-western-ghats"
          },
          {
            "name": "Thiruvananthapuram (Trivandrum)",
            "url": "https://www.lonelyplanet.com/destinations/india/kerala/thiruvananthapuram-trivandrum"
          },
          {
            "name": "Tiruvannamalai",
            "url": "https://www.lonelyplanet.com/destinations/india/tamil-nadu/tiruvannamalai"
          },
          {
            "name": "Udaipur",
            "url": "https://www.lonelyplanet.com/destinations/india/rajasthan/udaipur"
          },
          {
            "name": "Uttarakhand",
            "url": "https://www.lonelyplanet.com/destinations/india/uttarakhand-uttaranchal"
          },
          {
            "name": "Uttar Pradesh",
            "url": "https://www.lonelyplanet.com/destinations/india/uttar-pradesh"
          },
          {
            "name": "Varanasi",
            "url": "https://www.lonelyplanet.com/destinations/india/uttar-pradesh/varanasi"
          },
          {
            "name": "Varkala",
            "url": "https://www.lonelyplanet.com/destinations/india/kerala/varkala"
          },
          {
            "name": "Vrindavan",
            "url": "https://www.lonelyplanet.com/destinations/india/uttar-pradesh/vrindavan"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "Indonesia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/indonesia",
        "cities": [
          {
            "name": "Aceh",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/aceh"
          },
          {
            "name": "Bali",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/bali"
          },
          {
            "name": "Balikpapan",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/kalimantan/balikpapan"
          },
          {
            "name": "Banda Aceh",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/sumatra/banda-aceh"
          },
          {
            "name": "Banda Islands",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/banda-islands"
          },
          {
            "name": "Bandung",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/java/bandung"
          },
          {
            "name": "Banyak Islands",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/banyak-islands"
          },
          {
            "name": "Borobudur",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/java/borobudur"
          },
          {
            "name": "Bukit Lawang",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/sumatra/bukit-lawang"
          },
          {
            "name": "Bukit Peninsula",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/bukit-peninsula"
          },
          {
            "name": "Candidasa",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/bali/candidasa"
          },
          {
            "name": "Canggu",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/canggu"
          },
          {
            "name": "Danau Toba",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/sumatra/danau-toba"
          },
          {
            "name": "Denpasar",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/bali/denpasar"
          },
          {
            "name": "East Bali",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/east-bali"
          },
          {
            "name": "East Java",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/east-java"
          },
          {
            "name": "Flores",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/nusa-tenggara/flores"
          },
          {
            "name": "Gili Air",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/gili-air"
          },
          {
            "name": "Gili Islands",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/nusa-tenggara/gili-islands"
          },
          {
            "name": "Gili Meno",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/gili-meno"
          },
          {
            "name": "Gili Trawangan",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/gili-trawangan"
          },
          {
            "name": "Gunung Leuser National Park",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/gunung-leuser-national-park"
          },
          {
            "name": "Jakarta",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/jakarta"
          },
          {
            "name": "Java",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/java"
          },
          {
            "name": "Kalimantan",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/kalimantan"
          },
          {
            "name": "Kerobokan",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/kerobokan"
          },
          {
            "name": "Komodo & Rinca Islands",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/komodo-rinca-islands"
          },
          {
            "name": "Kuta & Legian",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/kuta-legian"
          },
          {
            "name": "Kuta & Southwest Beaches",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/kuta-southwest-beaches"
          },
          {
            "name": "Labuan Bajo",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/nusa-tenggara/labuanbajo"
          },
          {
            "name": "Lombok",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/lombok"
          },
          {
            "name": "Lovina",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/bali/lovina"
          },
          {
            "name": "Makassar",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/sulawesi/makassar-ujung-padang"
          },
          {
            "name": "Maluku",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/maluku-moluccas"
          },
          {
            "name": "Manado",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/sulawesi/manado"
          },
          {
            "name": "Mataram",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/nusa-tenggara/mataram"
          },
          {
            "name": "Medan",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/sumatra/medan"
          },
          {
            "name": "Mentawai Islands",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/sumatra/mentawai-islands"
          },
          {
            "name": "North Bali",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/north-bali"
          },
          {
            "name": "North Sulawesi",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/north-sulawesi"
          },
          {
            "name": "North Sumatra",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/north-sumatra"
          },
          {
            "name": "Nusa Dua",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/nusa-dua"
          },
          {
            "name": "Nusa Lembongan",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/bali/nusa-lembongan"
          },
          {
            "name": "Nusa Penida",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/nusa-penida"
          },
          {
            "name": "Nusa Tenggara",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/nusa-tenggara"
          },
          {
            "name": "Padang",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/sumatra/padang"
          },
          {
            "name": "Padangbai",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/bali/padangbai"
          },
          {
            "name": "Papua",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/papua-irian-jaya"
          },
          {
            "name": "Pulau Bintan",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/sumatra/pulau-bintan"
          },
          {
            "name": "Raja Ampat Islands",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/raja-ampat-islands"
          },
          {
            "name": "Sanur",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/bali/sanur"
          },
          {
            "name": "Semarang",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/semarang"
          },
          {
            "name": "Seminyak",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/seminyak"
          },
          {
            "name": "Senggigi",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/nusa-tenggara/senggigi"
          },
          {
            "name": "Singaraja",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/singaraja"
          },
          {
            "name": "Solo",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/java/solo"
          },
          {
            "name": "Sorong",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/sorong"
          },
          {
            "name": "South Bali & the Islands",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/south-bali-the-islands"
          },
          {
            "name": "South Lombok",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/south-lombok"
          },
          {
            "name": "South Sulawesi",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/south-sulawesi"
          },
          {
            "name": "Sulawesi",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/sulawesi"
          },
          {
            "name": "Sumatra",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/sumatra"
          },
          {
            "name": "Sumba",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/nusa-tenggara/sumba"
          },
          {
            "name": "Sumbawa",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/nusa-tenggara/sumbawa"
          },
          {
            "name": "Surabaya",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/java/surabaya"
          },
          {
            "name": "Tana Toraja",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/sulawesi/tana-toraja"
          },
          {
            "name": "Tanjung Puting National Park",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/tanjung-puting-national-park"
          },
          {
            "name": "Thousand Islands",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/thousand-islands"
          },
          {
            "name": "Ubud",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/bali/ubud"
          },
          {
            "name": "Ubud Region",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/ubud-region"
          },
          {
            "name": "West Bali",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/west-bali"
          },
          {
            "name": "West Java",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/west-java"
          },
          {
            "name": "West Papua",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/west-papua"
          },
          {
            "name": "West Timor",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/nusa-tenggara/west-timor"
          },
          {
            "name": "Yogyakarta",
            "url": "https://www.lonelyplanet.com/destinations/indonesia/java/yogyakarta"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "Japan",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/japan",
        "cities": [
          {
            "name": "Around Tokyo",
            "url": "https://www.lonelyplanet.com/destinations/japan/around-tokyo"
          },
          {
            "name": "Beppu",
            "url": "https://www.lonelyplanet.com/destinations/japan/kyushu/beppu"
          },
          {
            "name": "Central Honshū",
            "url": "https://www.lonelyplanet.com/destinations/japan/central-honshu"
          },
          {
            "name": "Fuji Five Lakes",
            "url": "https://www.lonelyplanet.com/destinations/japan/west-of-tokyo/fuji-go-ko"
          },
          {
            "name": "Fukuoka",
            "url": "https://www.lonelyplanet.com/destinations/japan/kyushu/fukuoka"
          },
          {
            "name": "Hakone",
            "url": "https://www.lonelyplanet.com/destinations/japan/west-of-tokyo/hakone"
          },
          {
            "name": "Hiroshima",
            "url": "https://www.lonelyplanet.com/destinations/japan/hiroshima"
          },
          {
            "name": "Hokkaidō",
            "url": "https://www.lonelyplanet.com/destinations/japan/hokkaido"
          },
          {
            "name": "Izu Peninsula",
            "url": "https://www.lonelyplanet.com/destinations/japan/west-of-tokyo/izu-hanto"
          },
          {
            "name": "Kamakura",
            "url": "https://www.lonelyplanet.com/destinations/japan/south-of-tokyo/kamakura"
          },
          {
            "name": "Kanazawa",
            "url": "https://www.lonelyplanet.com/destinations/japan/central-honshu/kanazawa"
          },
          {
            "name": "Kanazawa & the Hokuriku Coast",
            "url": "https://www.lonelyplanet.com/destinations/japan/central-honshu/ishikawa-ken"
          },
          {
            "name": "Kansai",
            "url": "https://www.lonelyplanet.com/destinations/japan/kansai"
          },
          {
            "name": "Kii Peninsula",
            "url": "https://www.lonelyplanet.com/destinations/japan/kansai/kii-hanto"
          },
          {
            "name": "Kōbe",
            "url": "https://www.lonelyplanet.com/destinations/japan/kansai/kobe"
          },
          {
            "name": "Kumamoto",
            "url": "https://www.lonelyplanet.com/destinations/japan/kyushu/kumamoto"
          },
          {
            "name": "Kyoto",
            "url": "https://www.lonelyplanet.com/destinations/japan/kansai/kyoto"
          },
          {
            "name": "Kyūshū",
            "url": "https://www.lonelyplanet.com/destinations/japan/kyushu"
          },
          {
            "name": "Matsumoto",
            "url": "https://www.lonelyplanet.com/destinations/japan/central-honshu/matsumoto"
          },
          {
            "name": "Matsumoto & the Northern Japan Alps",
            "url": "https://www.lonelyplanet.com/destinations/japan/matsumoto-the-northern-japan-alps"
          },
          {
            "name": "Miyajima",
            "url": "https://www.lonelyplanet.com/destinations/japan/western-honshu/miyajima"
          },
          {
            "name": "Mt Fuji",
            "url": "https://www.lonelyplanet.com/destinations/japan/west-of-tokyo/mt-fuji"
          },
          {
            "name": "Nagano Region",
            "url": "https://www.lonelyplanet.com/destinations/japan/central-honshu/nagano-ken"
          },
          {
            "name": "Nagasaki",
            "url": "https://www.lonelyplanet.com/destinations/japan/kyushu/nagasaki"
          },
          {
            "name": "Nagoya",
            "url": "https://www.lonelyplanet.com/destinations/japan/central-honshu/nagoya"
          },
          {
            "name": "Naha",
            "url": "https://www.lonelyplanet.com/destinations/japan/okinawa-and-the-southwest-islands/naha"
          },
          {
            "name": "Naoshima",
            "url": "https://www.lonelyplanet.com/destinations/japan/naoshima"
          },
          {
            "name": "Nara",
            "url": "https://www.lonelyplanet.com/destinations/japan/kansai/nara"
          },
          {
            "name": "Nikkō",
            "url": "https://www.lonelyplanet.com/destinations/japan/north-of-tokyo/nikko"
          },
          {
            "name": "Northern Honshū (Tōhoku)",
            "url": "https://www.lonelyplanet.com/destinations/japan/northern-honshu"
          },
          {
            "name": "Okinawa & the Southwest Islands",
            "url": "https://www.lonelyplanet.com/destinations/japan/okinawa-and-the-southwest-islands"
          },
          {
            "name": "Osaka",
            "url": "https://www.lonelyplanet.com/destinations/japan/kansai/osaka"
          },
          {
            "name": "Ōsumi Islands",
            "url": "https://www.lonelyplanet.com/destinations/japan/okinawa-and-the-southwest-islands/osumi-shoto"
          },
          {
            "name": "Sapporo",
            "url": "https://www.lonelyplanet.com/destinations/japan/hokkaido/sapporo"
          },
          {
            "name": "Shikoku",
            "url": "https://www.lonelyplanet.com/destinations/japan/shikoku"
          },
          {
            "name": "Takayama",
            "url": "https://www.lonelyplanet.com/destinations/japan/central-honshu/takayama"
          },
          {
            "name": "Tokyo",
            "url": "https://www.lonelyplanet.com/destinations/japan/tokyo"
          },
          {
            "name": "Western Honshū",
            "url": "https://www.lonelyplanet.com/destinations/japan/western-honshu"
          },
          {
            "name": "Yaeyama Islands",
            "url": "https://www.lonelyplanet.com/destinations/japan/okinawa-and-the-southwest-islands/yaeyama-shoto"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "Kazakhstan",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/kazakhstan",
        "cities": [
          {
            "name": "Almaty",
            "url": "https://www.lonelyplanet.com/destinations/kazakhstan/almaty"
          },
          {
            "name": "Nur-Sultan (Astana)",
            "url": "https://www.lonelyplanet.com/destinations/kazakhstan/northern-kazakhstan/astana"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "Kyrgyzstan",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/kyrgyzstan",
        "cities": [
          {
            "name": "Bishkek",
            "url": "https://www.lonelyplanet.com/destinations/kyrgyzstan/bishkek"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "Laos",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/laos",
        "cities": [
          {
            "name": "Luang Prabang",
            "url": "https://www.lonelyplanet.com/destinations/laos/northern-laos/luang-prabang"
          },
          {
            "name": "Nakai–Nam Theun National Park & Around",
            "url": "https://www.lonelyplanet.com/destinations/laos/bolikhamsai-and-khammuan-provinces/nakai-nam-theun-national-park-and-around"
          },
          {
            "name": "Nong Khiaw",
            "url": "https://www.lonelyplanet.com/destinations/laos/northern-laos/nong-khiaw"
          },
          {
            "name": "Northern Laos",
            "url": "https://www.lonelyplanet.com/destinations/laos/northern-laos"
          },
          {
            "name": "Pakse",
            "url": "https://www.lonelyplanet.com/destinations/laos/southern-laos/pakse"
          },
          {
            "name": "Southern Laos",
            "url": "https://www.lonelyplanet.com/destinations/laos/southern-laos"
          },
          {
            "name": "Vang Vieng",
            "url": "https://www.lonelyplanet.com/destinations/laos/northern-laos/vang-vieng"
          },
          {
            "name": "Vientiane",
            "url": "https://www.lonelyplanet.com/destinations/laos/vientiane"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "Malaysia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/malaysia",
        "cities": [
          {
            "name": "Batu Caves",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/batu-caves"
          },
          {
            "name": "Cameron Highlands",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/peninsular-malaysia-west-coast/cameron-highlands"
          },
          {
            "name": "George Town",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/peninsular-malaysia-west-coast/georgetown"
          },
          {
            "name": "Gunung Mulu National Park",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/malaysian-borneo-sarawak/gunung-mulu-national-park"
          },
          {
            "name": "Ipoh",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/peninsular-malaysia-west-coast/ipoh"
          },
          {
            "name": "Johor Bahru",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/peninsular-malaysia-east-coast/johor-bahru"
          },
          {
            "name": "Kota Bharu",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/peninsular-malaysia-east-coast/kota-bharu"
          },
          {
            "name": "Kota Kinabalu",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/malaysian-borneo-sabah/kota-kinabalu"
          },
          {
            "name": "Kuala Lumpur",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/kuala-lumpur"
          },
          {
            "name": "Kuantan",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/peninsular-malaysia-east-coast/kuantan"
          },
          {
            "name": "Kuching",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/malaysian-borneo-sarawak/kuching"
          },
          {
            "name": "Melaka",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/peninsular-malaysia-west-coast/melaka"
          },
          {
            "name": "Melaka City",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/melaka-city"
          },
          {
            "name": "Miri",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/malaysian-borneo-sarawak/miri"
          },
          {
            "name": "Mt Kinabalu & Kinabalu National Park",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/mt-kinabalu-kinabalu-national-park"
          },
          {
            "name": "Penang",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/peninsular-malaysia-west-coast/pulau-penang"
          },
          {
            "name": "Peninsular Malaysia's Northeast",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/peninsular-malaysia-s-northeast"
          },
          {
            "name": "Pulau Langkawi",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/peninsular-malaysia-west-coast/pulau-langkawi"
          },
          {
            "name": "Pulau Perhentian",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/peninsular-malaysia-east-coast/pulau-perhentian"
          },
          {
            "name": "Pulau Tioman",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/peninsular-malaysia-east-coast/pulau-tioman"
          },
          {
            "name": "Sabah",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/malaysian-borneo-sabah"
          },
          {
            "name": "Sandakan",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/malaysian-borneo-sabah/sandakan"
          },
          {
            "name": "Sarawak",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/malaysian-borneo-sarawak"
          },
          {
            "name": "Semporna",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/malaysian-borneo-sabah/semporna-and-pulau-sipadan"
          },
          {
            "name": "Taiping",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/taiping"
          },
          {
            "name": "Tunku Abdul Rahman National Park",
            "url": "https://www.lonelyplanet.com/destinations/malaysia/malaysian-borneo-sabah/tunku-abdul-rahman-national-park"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "Maldives",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/maldives",
        "cities": [
          {
            "name": "Maafushi",
            "url": "https://www.lonelyplanet.com/destinations/maldives/maafushi"
          },
          {
            "name": "Male",
            "url": "https://www.lonelyplanet.com/destinations/maldives/male"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "Mongolia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/mongolia",
        "cities": [
          {
            "name": "Ulaanbaatar",
            "url": "https://www.lonelyplanet.com/destinations/mongolia/ulaanbaatar"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "Myanmar (Burma)",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/myanmar-burma",
        "cities": [
          {
            "name": "Chin State",
            "url": "https://www.lonelyplanet.com/destinations/myanmar-burma/chin-state"
          },
          {
            "name": "Yangon",
            "url": "https://www.lonelyplanet.com/destinations/myanmar-burma/yangon-rangoon"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "Nepal",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/nepal",
        "cities": [
          {
            "name": "Annapurna Circuit Trek",
            "url": "https://www.lonelyplanet.com/destinations/nepal/annapurna-circuit-trek"
          },
          {
            "name": "Around the Kathmandu Valley",
            "url": "https://www.lonelyplanet.com/destinations/nepal/around-the-kathmandu-valley"
          },
          {
            "name": "Bandipur",
            "url": "https://www.lonelyplanet.com/destinations/nepal/kathmandu-to-pokhara/bandipur"
          },
          {
            "name": "Bardia National Park",
            "url": "https://www.lonelyplanet.com/destinations/nepal/the-terai-and-mahabharat-range/royal-bardia-national-park"
          },
          {
            "name": "Bhaktapur",
            "url": "https://www.lonelyplanet.com/destinations/nepal/around-the-kathmandu-valley/bhaktapur"
          },
          {
            "name": "Chitwan National Park",
            "url": "https://www.lonelyplanet.com/destinations/nepal/the-terai-and-mahabharat-range/royal-chitwan-national-park"
          },
          {
            "name": "Everest Base Camp Trek",
            "url": "https://www.lonelyplanet.com/destinations/nepal/everest-base-camp-trek-1339877"
          },
          {
            "name": "Everest Region",
            "url": "https://www.lonelyplanet.com/destinations/nepal/everest-region"
          },
          {
            "name": "Himalayan Region",
            "url": "https://www.lonelyplanet.com/destinations/nepal/himalayan-region"
          },
          {
            "name": "Kathmandu",
            "url": "https://www.lonelyplanet.com/destinations/nepal/kathmandu"
          },
          {
            "name": "Langtang Valley Trek",
            "url": "https://www.lonelyplanet.com/destinations/nepal/langtang-valley-trek"
          },
          {
            "name": "Nagarkot",
            "url": "https://www.lonelyplanet.com/destinations/nepal/around-the-kathmandu-valley/nagarkot"
          },
          {
            "name": "Patan",
            "url": "https://www.lonelyplanet.com/destinations/nepal/around-the-kathmandu-valley/patan"
          },
          {
            "name": "Pokhara",
            "url": "https://www.lonelyplanet.com/destinations/nepal/pokhara"
          },
          {
            "name": "Shivapuri Nagarjun National Park",
            "url": "https://www.lonelyplanet.com/destinations/nepal/around-the-kathmandu-valley/shivapuri-national-park"
          },
          {
            "name": "The Terai & Mahabharat Range",
            "url": "https://www.lonelyplanet.com/destinations/nepal/the-terai-and-mahabharat-range"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "North Korea",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/north-korea",
        "cities": [
          {
            "name": "Pyongyang",
            "url": "https://www.lonelyplanet.com/destinations/north-korea/pyongyang"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "Pakistan",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/pakistan",
        "cities": [
          {
            "name": "Islamabad & Rawalpindi",
            "url": "https://www.lonelyplanet.com/destinations/pakistan/islamabad-and-rawalpindi"
          },
          {
            "name": "Karachi",
            "url": "https://www.lonelyplanet.com/destinations/pakistan/sindh/karachi"
          },
          {
            "name": "Karakoram Highway",
            "url": "https://www.lonelyplanet.com/destinations/pakistan/karakoram-highway"
          },
          {
            "name": "Lahore",
            "url": "https://www.lonelyplanet.com/destinations/pakistan/punjab/lahore"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "Philippines",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/philippines",
        "cities": [
          {
            "name": "Bacuit Archipelago",
            "url": "https://www.lonelyplanet.com/destinations/philippines/bacuit-archipelago"
          },
          {
            "name": "Baguio",
            "url": "https://www.lonelyplanet.com/destinations/philippines/north-luzon/baguio"
          },
          {
            "name": "Bantayan Island",
            "url": "https://www.lonelyplanet.com/destinations/philippines/bantayan-island"
          },
          {
            "name": "Bicol",
            "url": "https://www.lonelyplanet.com/destinations/philippines/bicol"
          },
          {
            "name": "Bohol",
            "url": "https://www.lonelyplanet.com/destinations/philippines/the-visayas/bohol"
          },
          {
            "name": "Boracay",
            "url": "https://www.lonelyplanet.com/destinations/philippines/the-visayas/boracay"
          },
          {
            "name": "Camiguin",
            "url": "https://www.lonelyplanet.com/destinations/philippines/mindanao/camiguin"
          },
          {
            "name": "Cebu",
            "url": "https://www.lonelyplanet.com/destinations/philippines/the-visayas/cebu"
          },
          {
            "name": "Cebu City",
            "url": "https://www.lonelyplanet.com/destinations/philippines/the-visayas/cebu-city"
          },
          {
            "name": "Coron Town",
            "url": "https://www.lonelyplanet.com/destinations/philippines/coron-town"
          },
          {
            "name": "Davao",
            "url": "https://www.lonelyplanet.com/destinations/philippines/davao"
          },
          {
            "name": "Eastern Visayas",
            "url": "https://www.lonelyplanet.com/destinations/philippines/eastern-visayas"
          },
          {
            "name": "El Nido",
            "url": "https://www.lonelyplanet.com/destinations/philippines/palawan/el-nido"
          },
          {
            "name": "Leyte",
            "url": "https://www.lonelyplanet.com/destinations/philippines/the-visayas/samar-and-leyte"
          },
          {
            "name": "Malapascua Island",
            "url": "https://www.lonelyplanet.com/destinations/philippines/the-visayas/malapascua-island"
          },
          {
            "name": "Manila",
            "url": "https://www.lonelyplanet.com/destinations/philippines/manila"
          },
          {
            "name": "Mindanao",
            "url": "https://www.lonelyplanet.com/destinations/philippines/mindanao"
          },
          {
            "name": "North Luzon",
            "url": "https://www.lonelyplanet.com/destinations/philippines/north-luzon"
          },
          {
            "name": "Palawan",
            "url": "https://www.lonelyplanet.com/destinations/philippines/palawan"
          },
          {
            "name": "Panay",
            "url": "https://www.lonelyplanet.com/destinations/philippines/the-visayas/panay"
          },
          {
            "name": "Panglao Island",
            "url": "https://www.lonelyplanet.com/destinations/philippines/the-visayas/panglao-island"
          },
          {
            "name": "Puerto Princesa",
            "url": "https://www.lonelyplanet.com/destinations/philippines/palawan/puerto-princesa"
          },
          {
            "name": "Sabang",
            "url": "https://www.lonelyplanet.com/destinations/philippines/palawan/sabang"
          },
          {
            "name": "Siargao",
            "url": "https://www.lonelyplanet.com/destinations/philippines/mindanao/siargao"
          },
          {
            "name": "Siquijor",
            "url": "https://www.lonelyplanet.com/destinations/philippines/the-visayas/siquijor"
          },
          {
            "name": "Southeast Luzon",
            "url": "https://www.lonelyplanet.com/destinations/philippines/southeast-luzon"
          },
          {
            "name": "Vigan",
            "url": "https://www.lonelyplanet.com/destinations/philippines/north-luzon/vigan"
          },
          {
            "name": "Western Visayas",
            "url": "https://www.lonelyplanet.com/destinations/philippines/western-visayas"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "South Korea",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/south-korea",
        "cities": [
          {
            "name": "Busan",
            "url": "https://www.lonelyplanet.com/destinations/south-korea/gyeongsangnam-do/busan"
          },
          {
            "name": "Daegu",
            "url": "https://www.lonelyplanet.com/destinations/south-korea/gyeongsangbuk-do/daegu"
          },
          {
            "name": "Gangneung",
            "url": "https://www.lonelyplanet.com/destinations/south-korea/gang-won-do/gangneung"
          },
          {
            "name": "Gangwon-do",
            "url": "https://www.lonelyplanet.com/destinations/south-korea/gang-won-do"
          },
          {
            "name": "Gwangju",
            "url": "https://www.lonelyplanet.com/destinations/south-korea/jeollanam-do/gwangju"
          },
          {
            "name": "Gyeongju",
            "url": "https://www.lonelyplanet.com/destinations/south-korea/gyeongsangbuk-do/gyeongju"
          },
          {
            "name": "Gyeongsangbuk-do",
            "url": "https://www.lonelyplanet.com/destinations/south-korea/gyeongsangbuk-do"
          },
          {
            "name": "Incheon",
            "url": "https://www.lonelyplanet.com/destinations/south-korea/gyeonggi-do/incheon"
          },
          {
            "name": "Jeju-do",
            "url": "https://www.lonelyplanet.com/destinations/south-korea/jejudo"
          },
          {
            "name": "Jeju-si",
            "url": "https://www.lonelyplanet.com/destinations/south-korea/jejudo/jeju-si"
          },
          {
            "name": "Jeollanam-do",
            "url": "https://www.lonelyplanet.com/destinations/south-korea/jeollanam-do"
          },
          {
            "name": "Jeonju",
            "url": "https://www.lonelyplanet.com/destinations/south-korea/jeollabuk-do/jeonju"
          },
          {
            "name": "Mokpo",
            "url": "https://www.lonelyplanet.com/destinations/south-korea/jeollanam-do/mokpo"
          },
          {
            "name": "Seogwipo",
            "url": "https://www.lonelyplanet.com/destinations/south-korea/jejudo/seogwipo"
          },
          {
            "name": "Seoraksan National Park",
            "url": "https://www.lonelyplanet.com/destinations/south-korea/gang-won-do/seoraksan-national-park"
          },
          {
            "name": "Seoul",
            "url": "https://www.lonelyplanet.com/destinations/south-korea/seoul"
          },
          {
            "name": "Suwon",
            "url": "https://www.lonelyplanet.com/destinations/south-korea/gyeonggi-do/suwon"
          },
          {
            "name": "The DMZ",
            "url": "https://www.lonelyplanet.com/destinations/south-korea/gyeonggi-do/panmunjom-and-the-dmz-tour"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "Sri Lanka",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/sri-lanka",
        "cities": [
          {
            "name": "Anuradhapura",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/the-ancient-cities/anuradhapura"
          },
          {
            "name": "Arugam Bay",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/the-east/arugam-bay"
          },
          {
            "name": "Bundala National Park",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/the-south/bundala-national-park"
          },
          {
            "name": "Colombo",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/colombo"
          },
          {
            "name": "Ella",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/the-hill-country/ella"
          },
          {
            "name": "Galle",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/the-south/galle"
          },
          {
            "name": "Hikkaduwa & Around",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/west-coast/hikkaduwa-and-around"
          },
          {
            "name": "Jaffna",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/jaffna-and-the-north/jaffna"
          },
          {
            "name": "Kandy",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/the-hill-country/kandy"
          },
          {
            "name": "Matara",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/the-south/matara"
          },
          {
            "name": "Mirissa",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/the-south/mirissa"
          },
          {
            "name": "Negombo",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/west-coast/negombo"
          },
          {
            "name": "Nuwara Eliya",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/the-hill-country/nuwara-eliya"
          },
          {
            "name": "Polonnaruwa",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/the-ancient-cities/polonnaruwa"
          },
          {
            "name": "Sigiriya",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/the-ancient-cities/sigiriya"
          },
          {
            "name": "Tangalla & Around",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/the-south/tangalla"
          },
          {
            "name": "The Ancient Cities",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/the-ancient-cities"
          },
          {
            "name": "The East",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/the-east"
          },
          {
            "name": "The Hill Country",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/the-hill-country"
          },
          {
            "name": "The South",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/the-south"
          },
          {
            "name": "Trincomalee",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/the-east/trincomalee"
          },
          {
            "name": "Uda Walawe National Park",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/the-hill-country/udawalawe-national-park"
          },
          {
            "name": "Unawatuna",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/the-south/unawatuna"
          },
          {
            "name": "Weligama",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/the-south/weligama"
          },
          {
            "name": "Wilpattu National Park",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/west-coast/wilpattu-national-park"
          },
          {
            "name": "Yala National Park",
            "url": "https://www.lonelyplanet.com/destinations/sri-lanka/the-south/yala-national-park"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "Tajikistan",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/tajikistan",
        "cities": [
          {
            "name": "Dushanbe",
            "url": "https://www.lonelyplanet.com/destinations/tajikistan/dushanbe"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "Thailand",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/thailand",
        "cities": [
          {
            "name": "Ang Thong Marine National Park",
            "url": "https://www.lonelyplanet.com/destinations/thailand/lower-southern-gulf/ang-thong-marine-national-park"
          },
          {
            "name": "Ao Nang",
            "url": "https://www.lonelyplanet.com/destinations/thailand/andaman-coast/ao-nang"
          },
          {
            "name": "Ao Phang-Nga Marine National Park",
            "url": "https://www.lonelyplanet.com/destinations/thailand/andaman-coast/ao-phang-nga-marine-national-park"
          },
          {
            "name": "Ayuthaya",
            "url": "https://www.lonelyplanet.com/destinations/thailand/ayuthaya-province/ayuthaya"
          },
          {
            "name": "Bangkok",
            "url": "https://www.lonelyplanet.com/destinations/thailand/bangkok"
          },
          {
            "name": "Bangkok Region",
            "url": "https://www.lonelyplanet.com/destinations/thailand/bangkok-region"
          },
          {
            "name": "Central Thailand",
            "url": "https://www.lonelyplanet.com/destinations/thailand/central-thailand"
          },
          {
            "name": "Chiang Mai",
            "url": "https://www.lonelyplanet.com/destinations/thailand/chiang-mai-province/chiang-mai"
          },
          {
            "name": "Chiang Mai Province",
            "url": "https://www.lonelyplanet.com/destinations/thailand/chiang-mai-province"
          },
          {
            "name": "Chiang Rai",
            "url": "https://www.lonelyplanet.com/destinations/thailand/chiang-rai-province/chiang-rai"
          },
          {
            "name": "Chiang Rai Province",
            "url": "https://www.lonelyplanet.com/destinations/thailand/chiang-rai-province"
          },
          {
            "name": "Hat Kata",
            "url": "https://www.lonelyplanet.com/destinations/thailand/hat-kata"
          },
          {
            "name": "Hat Khao Lak",
            "url": "https://www.lonelyplanet.com/destinations/thailand/andaman-coast/khao-lak"
          },
          {
            "name": "Hat Patong",
            "url": "https://www.lonelyplanet.com/destinations/thailand/andaman-coast/patong"
          },
          {
            "name": "Hat Yai",
            "url": "https://www.lonelyplanet.com/destinations/thailand/lower-southern-gulf/hat-yai"
          },
          {
            "name": "Hua Hin",
            "url": "https://www.lonelyplanet.com/destinations/thailand/upper-southern-gulf/hua-hin"
          },
          {
            "name": "Kanchanaburi",
            "url": "https://www.lonelyplanet.com/destinations/thailand/kanchanaburi-province/kanchanaburi"
          },
          {
            "name": "Khao Sok National Park",
            "url": "https://www.lonelyplanet.com/destinations/thailand/lower-southern-gulf/khao-sok-national-park"
          },
          {
            "name": "Khao Yai National Park",
            "url": "https://www.lonelyplanet.com/destinations/thailand/nakhon-ratchasima-province/khao-yai-national-park"
          },
          {
            "name": "Ko Chang",
            "url": "https://www.lonelyplanet.com/destinations/thailand/andaman-coast/ko-chang"
          },
          {
            "name": "Ko Kut",
            "url": "https://www.lonelyplanet.com/destinations/thailand/ko-kut"
          },
          {
            "name": "Ko Lanta",
            "url": "https://www.lonelyplanet.com/destinations/thailand/andaman-coast/ko-lanta"
          },
          {
            "name": "Ko Lipe",
            "url": "https://www.lonelyplanet.com/destinations/thailand/andaman-coast/ko-lipe"
          },
          {
            "name": "Ko Pha-Ngan",
            "url": "https://www.lonelyplanet.com/destinations/thailand/lower-southern-gulf/ko-pha-ngan"
          },
          {
            "name": "Ko Phi-Phi",
            "url": "https://www.lonelyplanet.com/destinations/thailand/andaman-coast/ko-phi-phi-don"
          },
          {
            "name": "Ko Samet",
            "url": "https://www.lonelyplanet.com/destinations/thailand/rayong-province/ko-samet"
          },
          {
            "name": "Ko Samui",
            "url": "https://www.lonelyplanet.com/destinations/thailand/ko-samui"
          },
          {
            "name": "Ko Samui & the Lower Gulf",
            "url": "https://www.lonelyplanet.com/destinations/thailand/ko-samui-the-lower-gulf"
          },
          {
            "name": "Ko Tao",
            "url": "https://www.lonelyplanet.com/destinations/thailand/lower-southern-gulf/ko-tao"
          },
          {
            "name": "Ko Tarutao Marine National Park",
            "url": "https://www.lonelyplanet.com/destinations/thailand/andaman-coast/ko-tarutao-marine-national-park"
          },
          {
            "name": "Krabi Province",
            "url": "https://www.lonelyplanet.com/destinations/thailand/andaman-coast/krabi-province"
          },
          {
            "name": "Krabi Town",
            "url": "https://www.lonelyplanet.com/destinations/thailand/andaman-coast/krabi"
          },
          {
            "name": "Laem Son National Park",
            "url": "https://www.lonelyplanet.com/destinations/thailand/andaman-coast/laem-son-national-park"
          },
          {
            "name": "Lampang",
            "url": "https://www.lonelyplanet.com/destinations/thailand/lampang-province/lampang"
          },
          {
            "name": "Mae Sot",
            "url": "https://www.lonelyplanet.com/destinations/thailand/tak-province/mae-sot"
          },
          {
            "name": "Nong Khai",
            "url": "https://www.lonelyplanet.com/destinations/thailand/nong-khai-province/nong-khai"
          },
          {
            "name": "Northeastern Thailand",
            "url": "https://www.lonelyplanet.com/destinations/thailand/northeastern-thailand"
          },
          {
            "name": "Northern Thailand",
            "url": "https://www.lonelyplanet.com/destinations/thailand/northern-thailand"
          },
          {
            "name": "Pai",
            "url": "https://www.lonelyplanet.com/destinations/thailand/mae-hong-son-province/pai"
          },
          {
            "name": "Pattaya",
            "url": "https://www.lonelyplanet.com/destinations/thailand/chonburi-province/pattaya"
          },
          {
            "name": "Phang-Nga Province",
            "url": "https://www.lonelyplanet.com/destinations/thailand/andaman-coast/phang-nga-province"
          },
          {
            "name": "Phitsanulok",
            "url": "https://www.lonelyplanet.com/destinations/thailand/phitsanulok-province/phitsanulok"
          },
          {
            "name": "Phuket",
            "url": "https://www.lonelyplanet.com/destinations/thailand/phuket-province"
          },
          {
            "name": "Phuket & the Andaman Coast",
            "url": "https://www.lonelyplanet.com/destinations/thailand/phuket-the-andaman-coast"
          },
          {
            "name": "Phuket Town",
            "url": "https://www.lonelyplanet.com/destinations/thailand/andaman-coast/phuket-town"
          },
          {
            "name": "Phu Kradueng National Park",
            "url": "https://www.lonelyplanet.com/destinations/thailand/loei-province/phu-kradung-national-park"
          },
          {
            "name": "Prachuap Khiri Khan",
            "url": "https://www.lonelyplanet.com/destinations/thailand/upper-southern-gulf/prachuap-khiri-khan"
          },
          {
            "name": "Railay",
            "url": "https://www.lonelyplanet.com/destinations/thailand/andaman-coast/railay"
          },
          {
            "name": "Sukhothai",
            "url": "https://www.lonelyplanet.com/destinations/thailand/sukhothai-province/sukhothai"
          },
          {
            "name": "Surat Thani",
            "url": "https://www.lonelyplanet.com/destinations/thailand/lower-southern-gulf/surat-thani"
          },
          {
            "name": "Trang Beaches & Islands",
            "url": "https://www.lonelyplanet.com/destinations/thailand/andaman-coast/trang-beaches-and-islands"
          },
          {
            "name": "Ubon Ratchathani",
            "url": "https://www.lonelyplanet.com/destinations/thailand/ubon-ratchathani-province/ubon-ratchathani"
          },
          {
            "name": "Udon Thani",
            "url": "https://www.lonelyplanet.com/destinations/thailand/udon-thani-province/udon-thani"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "The Gambia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/the-gambia",
        "cities": [
          {
            "name": "Banjul",
            "url": "https://www.lonelyplanet.com/destinations/the-gambia/banjul"
          },
          {
            "name": "Baobolong Wetland Reserve & Kiang West National Park",
            "url": "https://www.lonelyplanet.com/destinations/the-gambia/lower-gambia-river/kiang-west-national-park"
          },
          {
            "name": "Serekunda & Atlantic Coast Resorts",
            "url": "https://www.lonelyplanet.com/destinations/the-gambia/serekunda-and-the-atlantic-coast"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "Togo",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/togo",
        "cities": [
          {
            "name": "Lomé",
            "url": "https://www.lonelyplanet.com/destinations/togo/lome"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "Tunisia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/tunisia",
        "cities": [
          {
            "name": "Cap Bon",
            "url": "https://www.lonelyplanet.com/destinations/tunisia/cap-bon"
          },
          {
            "name": "Djerba",
            "url": "https://www.lonelyplanet.com/destinations/tunisia/southern-tunisia/jerba-and-houmt-souq"
          },
          {
            "name": "Hammamet",
            "url": "https://www.lonelyplanet.com/destinations/tunisia/hammamet"
          },
          {
            "name": "Northern Tunisia",
            "url": "https://www.lonelyplanet.com/destinations/tunisia/northern-tunisia"
          },
          {
            "name": "Sousse",
            "url": "https://www.lonelyplanet.com/destinations/tunisia/central-tunisia/sousse"
          },
          {
            "name": "Southern Tunisia",
            "url": "https://www.lonelyplanet.com/destinations/tunisia/southern-tunisia-1331902"
          },
          {
            "name": "Tunis",
            "url": "https://www.lonelyplanet.com/destinations/tunisia/tunis"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "Uganda",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/uganda",
        "cities": [
          {
            "name": "Kampala",
            "url": "https://www.lonelyplanet.com/destinations/uganda/kampala"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "Zambia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/zambia",
        "cities": [
          {
            "name": "Lusaka",
            "url": "https://www.lonelyplanet.com/destinations/zambia/lusaka"
          }
        ]
      },
      {
        "region": "ASIA",
        "country": "Zimbabwe",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/zimbabwe",
        "cities": [
          {
            "name": "Harare",
            "url": "https://www.lonelyplanet.com/destinations/zimbabwe/harare"
          },
          {
            "name": "Matobo National Park",
            "url": "https://www.lonelyplanet.com/destinations/zimbabwe/western-zimbabwe/matobo-national-park"
          },
          {
            "name": "Victoria Falls (town)",
            "url": "https://www.lonelyplanet.com/destinations/zimbabwe/victoria-falls-town"
          }
        ]
      }
    ]
  },
  {
    "region": "AUSTRALIA & PACIFIC",
    "countries": [
      {
        "region": "AUSTRALIA & PACIFIC",
        "country": "Australia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/australia",
        "cities": [
          {
            "name": "Adelaide",
            "url": "https://www.lonelyplanet.com/destinations/australia/south-australia/adelaide"
          },
          {
            "name": "Airlie Beach",
            "url": "https://www.lonelyplanet.com/destinations/australia/queensland/airlie-beach"
          },
          {
            "name": "Blue Mountains",
            "url": "https://www.lonelyplanet.com/destinations/australia/new-south-wales/blue-mountains"
          },
          {
            "name": "Brisbane",
            "url": "https://www.lonelyplanet.com/destinations/australia/queensland/brisbane-1336826"
          },
          {
            "name": "Brisbane & Around",
            "url": "https://www.lonelyplanet.com/destinations/australia/queensland/brisbane"
          },
          {
            "name": "Broome",
            "url": "https://www.lonelyplanet.com/destinations/australia/western-australia/broome"
          },
          {
            "name": "Byron Bay",
            "url": "https://www.lonelyplanet.com/destinations/australia/new-south-wales/byron-bay"
          },
          {
            "name": "Cairns",
            "url": "https://www.lonelyplanet.com/destinations/australia/queensland/cairns"
          },
          {
            "name": "Cairns & Far North Queensland",
            "url": "https://www.lonelyplanet.com/destinations/australia/queensland/cairns-far-north-queensland"
          },
          {
            "name": "Canberra",
            "url": "https://www.lonelyplanet.com/destinations/australia/australian-capital-territory/canberra"
          },
          {
            "name": "Darwin",
            "url": "https://www.lonelyplanet.com/destinations/australia/northern-territory/darwin"
          },
          {
            "name": "Gold Coast",
            "url": "https://www.lonelyplanet.com/destinations/australia/queensland/gold-coast"
          },
          {
            "name": "Great Barrier Reef",
            "url": "https://www.lonelyplanet.com/destinations/australia/queensland/great-barrier-reef"
          },
          {
            "name": "Great Ocean Road",
            "url": "https://www.lonelyplanet.com/destinations/australia/victoria/great-ocean-road"
          },
          {
            "name": "Hobart",
            "url": "https://www.lonelyplanet.com/destinations/australia/tasmania/hobart"
          },
          {
            "name": "Kangaroo Island",
            "url": "https://www.lonelyplanet.com/destinations/australia/south-australia/kangaroo-island"
          },
          {
            "name": "Karijini National Park",
            "url": "https://www.lonelyplanet.com/destinations/australia/western-australia/karijini-national-park"
          },
          {
            "name": "Launceston",
            "url": "https://www.lonelyplanet.com/destinations/australia/tasmania/launceston"
          },
          {
            "name": "Melbourne",
            "url": "https://www.lonelyplanet.com/destinations/australia/melbourne"
          },
          {
            "name": "Newcastle",
            "url": "https://www.lonelyplanet.com/destinations/australia/new-south-wales/newcastle"
          },
          {
            "name": "New South Wales",
            "url": "https://www.lonelyplanet.com/destinations/australia/new-south-wales"
          },
          {
            "name": "Noosa",
            "url": "https://www.lonelyplanet.com/destinations/australia/queensland/noosa"
          },
          {
            "name": "Northern Territory",
            "url": "https://www.lonelyplanet.com/destinations/australia/northern-territory"
          },
          {
            "name": "Perth",
            "url": "https://www.lonelyplanet.com/destinations/australia/western-australia/perth"
          },
          {
            "name": "Port Douglas",
            "url": "https://www.lonelyplanet.com/destinations/australia/queensland/port-douglas"
          },
          {
            "name": "Queensland",
            "url": "https://www.lonelyplanet.com/destinations/australia/queensland"
          },
          {
            "name": "Rockhampton",
            "url": "https://www.lonelyplanet.com/destinations/australia/queensland/rockhampton"
          },
          {
            "name": "South Australia",
            "url": "https://www.lonelyplanet.com/destinations/australia/south-australia"
          },
          {
            "name": "Sydney",
            "url": "https://www.lonelyplanet.com/destinations/australia/sydney"
          },
          {
            "name": "Tasmania",
            "url": "https://www.lonelyplanet.com/destinations/australia/tasmania"
          },
          {
            "name": "The Daintree",
            "url": "https://www.lonelyplanet.com/destinations/australia/queensland/the-daintree"
          },
          {
            "name": "The Whitsundays",
            "url": "https://www.lonelyplanet.com/destinations/australia/queensland/whitsunday-islands"
          },
          {
            "name": "Uluru-Kata Tjuta National Park",
            "url": "https://www.lonelyplanet.com/destinations/australia/northern-territory/uluru-kata-tjuta-national-park"
          },
          {
            "name": "Victoria",
            "url": "https://www.lonelyplanet.com/destinations/australia/victoria"
          },
          {
            "name": "West Coast Australia",
            "url": "https://www.lonelyplanet.com/destinations/australia/western-australia/west-coast-australia"
          },
          {
            "name": "Western Australia",
            "url": "https://www.lonelyplanet.com/destinations/australia/western-australia"
          }
        ]
      },
      {
        "region": "AUSTRALIA & PACIFIC",
        "country": "Fiji",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/fiji",
        "cities": [
          {
            "name": "Coral Coast",
            "url": "https://www.lonelyplanet.com/destinations/fiji/viti-levu/southern-viti-levu-and-the-coral-coast"
          },
          {
            "name": "Denarau Island",
            "url": "https://www.lonelyplanet.com/destinations/fiji/denarau-island"
          },
          {
            "name": "Mamanuca Group",
            "url": "https://www.lonelyplanet.com/destinations/fiji/mamanuca-group"
          },
          {
            "name": "Nadi",
            "url": "https://www.lonelyplanet.com/destinations/fiji/viti-levu/nadi"
          },
          {
            "name": "Nadi, Suva & Viti Levu",
            "url": "https://www.lonelyplanet.com/destinations/fiji/viti-levu"
          },
          {
            "name": "Natadola Beach",
            "url": "https://www.lonelyplanet.com/destinations/fiji/viti-levu/natadola-beach"
          },
          {
            "name": "Ovalau & the Lomaiviti Group",
            "url": "https://www.lonelyplanet.com/destinations/fiji/ovalau-and-the-lomaiviti-group"
          },
          {
            "name": "Suva",
            "url": "https://www.lonelyplanet.com/destinations/fiji/viti-levu/suva"
          },
          {
            "name": "Taveuni",
            "url": "https://www.lonelyplanet.com/destinations/fiji/taveuni"
          }
        ]
      },
      {
        "region": "AUSTRALIA & PACIFIC",
        "country": "French Polynesia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/tahiti-and-french-polynesia",
        "cities": [
          {
            "name": "Bora Bora",
            "url": "https://www.lonelyplanet.com/destinations/tahiti-and-french-polynesia/bora-bora"
          },
          {
            "name": "Mo'orea",
            "url": "https://www.lonelyplanet.com/destinations/tahiti-and-french-polynesia/moorea"
          },
          {
            "name": "Nuku Hiva",
            "url": "https://www.lonelyplanet.com/destinations/tahiti-and-french-polynesia/marquesas-islands/nuku-hiva"
          },
          {
            "name": "Ra'iatea & Taha'a",
            "url": "https://www.lonelyplanet.com/destinations/tahiti-and-french-polynesia/raiatea-and-tahaa"
          },
          {
            "name": "Tahiti",
            "url": "https://www.lonelyplanet.com/destinations/tahiti-and-french-polynesia/tahiti"
          },
          {
            "name": "The Marquesas",
            "url": "https://www.lonelyplanet.com/destinations/tahiti-and-french-polynesia/marquesas-islands"
          },
          {
            "name": "The Tuamotus",
            "url": "https://www.lonelyplanet.com/destinations/tahiti-and-french-polynesia/tuamotu-islands"
          }
        ]
      },
      {
        "region": "AUSTRALIA & PACIFIC",
        "country": "New Caledonia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/new-caledonia",
        "cities": [
          {
            "name": "Île des Pins",
            "url": "https://www.lonelyplanet.com/destinations/new-caledonia/ile-des-pins"
          },
          {
            "name": "Loyalty Islands",
            "url": "https://www.lonelyplanet.com/destinations/new-caledonia/loyalty-islands"
          },
          {
            "name": "Noumea",
            "url": "https://www.lonelyplanet.com/destinations/new-caledonia/noumea"
          }
        ]
      },
      {
        "region": "AUSTRALIA & PACIFIC",
        "country": "New Zealand",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/new-zealand",
        "cities": [
          {
            "name": "Abel Tasman National Park",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/marlborough-and-nelson/abel-tasman-national-park"
          },
          {
            "name": "Auckland",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/auckland-1341384"
          },
          {
            "name": "Auckland Region",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/auckland"
          },
          {
            "name": "Bay of Islands & Northland",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/northland-and-the-bay-of-islands"
          },
          {
            "name": "Christchurch",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/christchurch-and-canterbury/christchurch"
          },
          {
            "name": "Coromandel Peninsula",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/coromandel-region"
          },
          {
            "name": "Dunedin",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/dunedin-and-otago/dunedin"
          },
          {
            "name": "Hauraki Gulf Islands",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/auckland-region/hauraki-gulf-islands"
          },
          {
            "name": "Marlborough & Nelson",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/marlborough-and-nelson"
          },
          {
            "name": "Milford Sound",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/fiordland-and-southland/milford-sound"
          },
          {
            "name": "Napier",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/the-east-coast/napier"
          },
          {
            "name": "North Island",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/north-island"
          },
          {
            "name": "Queenstown",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/queenstown-and-wanaka/queenstown"
          },
          {
            "name": "Queenstown & Wanaka",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/queenstown-and-wanaka"
          },
          {
            "name": "Rotorua",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/rotorua-and-the-bay-of-plenty/rotorua"
          },
          {
            "name": "Rotorua & the Bay of Plenty",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/rotorua-and-the-bay-of-plenty"
          },
          {
            "name": "South Island",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/south-island"
          },
          {
            "name": "Taupo",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/taupo-and-the-central-plateau/taupo"
          },
          {
            "name": "Taupo & the Ruapehu Region",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/taupo-and-the-central-plateau"
          },
          {
            "name": "Waiheke Island",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/auckland-region/waiheke-island"
          },
          {
            "name": "Waikato & the Coromandel Peninsula",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/waikato-and-the-king-country"
          },
          {
            "name": "Wanaka",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/queenstown-and-wanaka/wanaka"
          },
          {
            "name": "Wellington",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/wellington"
          },
          {
            "name": "Westland Tai Poutini National Park",
            "url": "https://www.lonelyplanet.com/destinations/new-zealand/the-west-coast/westland-tai-poutini-national-park"
          }
        ]
      },
      {
        "region": "AUSTRALIA & PACIFIC",
        "country": "Palau",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/palau",
        "cities": [
          {
            "name": "Koror",
            "url": "https://www.lonelyplanet.com/destinations/palau/koror-state"
          }
        ]
      },
      {
        "region": "AUSTRALIA & PACIFIC",
        "country": "Papua New Guinea",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/papua-new-guinea",
        "cities": [
          {
            "name": "New Britain",
            "url": "https://www.lonelyplanet.com/destinations/papua-new-guinea/island-provinces/new-britain"
          },
          {
            "name": "Port Moresby",
            "url": "https://www.lonelyplanet.com/destinations/papua-new-guinea/port-moresby"
          }
        ]
      },
      {
        "region": "AUSTRALIA & PACIFIC",
        "country": "Samoa",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/samoa",
        "cities": [
          {
            "name": "Apia",
            "url": "https://www.lonelyplanet.com/destinations/samoa/apia"
          },
          {
            "name": "'Upolu",
            "url": "https://www.lonelyplanet.com/destinations/samoa/upolu"
          }
        ]
      },
      {
        "region": "AUSTRALIA & PACIFIC",
        "country": "The Cook Islands",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/rarotonga-and-the-cook-islands",
        "cities": [
          {
            "name": "Aitutaki",
            "url": "https://www.lonelyplanet.com/destinations/rarotonga-and-the-cook-islands/aitutaki"
          },
          {
            "name": "Rarotonga",
            "url": "https://www.lonelyplanet.com/destinations/rarotonga-and-the-cook-islands/rarotonga"
          }
        ]
      },
      {
        "region": "AUSTRALIA & PACIFIC",
        "country": "Vanuatu",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/vanuatu",
        "cities": [
          {
            "name": "Efate",
            "url": "https://www.lonelyplanet.com/destinations/vanuatu/efate"
          },
          {
            "name": "Espiritu Santo",
            "url": "https://www.lonelyplanet.com/destinations/vanuatu/espiritu-santo"
          },
          {
            "name": "Port Vila",
            "url": "https://www.lonelyplanet.com/destinations/vanuatu/efate/port-vila"
          }
        ]
      }
    ]
  },
  {
    "region": "CARIBBEAN",
    "countries": [
      {
        "region": "CARIBBEAN",
        "country": "British Virgin Islands",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/british-virgin-islands",
        "cities": [
          {
            "name": "Tortola",
            "url": "https://www.lonelyplanet.com/destinations/british-virgin-islands/tortola"
          },
          {
            "name": "Virgin Gorda",
            "url": "https://www.lonelyplanet.com/destinations/british-virgin-islands/virgin-gorda"
          }
        ]
      },
      {
        "region": "CARIBBEAN",
        "country": "Cayman Islands",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/cayman-islands",
        "cities": [
          {
            "name": "Grand Cayman",
            "url": "https://www.lonelyplanet.com/destinations/cayman-islands/grand-cayman"
          }
        ]
      },
      {
        "region": "CARIBBEAN",
        "country": "Cuba",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/cuba",
        "cities": [
          {
            "name": "Baracoa",
            "url": "https://www.lonelyplanet.com/destinations/cuba/eastern-cuba/baracoa"
          },
          {
            "name": "Bayamo",
            "url": "https://www.lonelyplanet.com/destinations/cuba/bayamo"
          },
          {
            "name": "Camagüey",
            "url": "https://www.lonelyplanet.com/destinations/cuba/camaguey"
          },
          {
            "name": "Cienfuegos",
            "url": "https://www.lonelyplanet.com/destinations/cuba/cienfuegos"
          },
          {
            "name": "Havana",
            "url": "https://www.lonelyplanet.com/destinations/cuba/havana"
          },
          {
            "name": "Holguín",
            "url": "https://www.lonelyplanet.com/destinations/cuba/holguin"
          },
          {
            "name": "Matanzas",
            "url": "https://www.lonelyplanet.com/destinations/cuba/matanzas"
          },
          {
            "name": "Santiago de Cuba",
            "url": "https://www.lonelyplanet.com/destinations/cuba/eastern-cuba/santiago-de-cuba"
          },
          {
            "name": "Trinidad",
            "url": "https://www.lonelyplanet.com/destinations/cuba/central-cuba/trinidad"
          },
          {
            "name": "Varadero",
            "url": "https://www.lonelyplanet.com/destinations/cuba/varadero"
          },
          {
            "name": "Viñales",
            "url": "https://www.lonelyplanet.com/destinations/cuba/pinar-del-rio-province/vinales"
          }
        ]
      },
      {
        "region": "CARIBBEAN",
        "country": "Grenada",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/grenada",
        "cities": [
          {
            "name": "Carriacou",
            "url": "https://www.lonelyplanet.com/destinations/grenada/carriacou"
          },
          {
            "name": "Grand Etang National Park",
            "url": "https://www.lonelyplanet.com/destinations/grenada/grenada-island/grand-etang-national-park"
          }
        ]
      },
      {
        "region": "CARIBBEAN",
        "country": "Guadeloupe",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/guadeloupe",
        "cities": [
          {
            "name": "Basse-Terre Island",
            "url": "https://www.lonelyplanet.com/destinations/guadeloupe/basse-terre"
          },
          {
            "name": "Deshaies",
            "url": "https://www.lonelyplanet.com/destinations/guadeloupe/deshaies"
          },
          {
            "name": "Grande-Terre",
            "url": "https://www.lonelyplanet.com/destinations/guadeloupe/grande-terre"
          },
          {
            "name": "Pointe-à-Pitre",
            "url": "https://www.lonelyplanet.com/destinations/guadeloupe/pointe-a-pitre"
          },
          {
            "name": "Terre-de-Haut",
            "url": "https://www.lonelyplanet.com/destinations/guadeloupe/terre-de-haut"
          }
        ]
      },
      {
        "region": "CARIBBEAN",
        "country": "Haiti",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/haiti",
        "cities": [
          {
            "name": "Port-au-Prince & Around",
            "url": "https://www.lonelyplanet.com/destinations/haiti/port-au-prince"
          }
        ]
      },
      {
        "region": "CARIBBEAN",
        "country": "Jamaica",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/jamaica",
        "cities": [
          {
            "name": "Montego Bay",
            "url": "https://www.lonelyplanet.com/destinations/jamaica/montego-bay"
          },
          {
            "name": "Montego Bay & Northwest Coast",
            "url": "https://www.lonelyplanet.com/destinations/jamaica/montego-bay-northwest-coast"
          },
          {
            "name": "Negril",
            "url": "https://www.lonelyplanet.com/destinations/jamaica/negril-and-the-west/negril"
          },
          {
            "name": "Ocho Rios",
            "url": "https://www.lonelyplanet.com/destinations/jamaica/northern-jamaica/ocho-rios"
          },
          {
            "name": "Ocho Rios, Port Antonio & the North Coast",
            "url": "https://www.lonelyplanet.com/destinations/jamaica/ocho-rios-port-antonio-the-north-coast"
          },
          {
            "name": "Port Antonio",
            "url": "https://www.lonelyplanet.com/destinations/jamaica/northern-jamaica/port-antonio"
          }
        ]
      },
      {
        "region": "CARIBBEAN",
        "country": "Martinique",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/martinique",
        "cities": [
          {
            "name": "Fort-de-France",
            "url": "https://www.lonelyplanet.com/destinations/martinique/fort-de-france"
          }
        ]
      },
      {
        "region": "CARIBBEAN",
        "country": "Puerto Rico",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/puerto-rico",
        "cities": [
          {
            "name": "Aguadilla",
            "url": "https://www.lonelyplanet.com/destinations/puerto-rico/aguadilla"
          },
          {
            "name": "Culebra",
            "url": "https://www.lonelyplanet.com/destinations/puerto-rico/eastern-puerto-rico/culebra"
          },
          {
            "name": "Culebra & Vieques",
            "url": "https://www.lonelyplanet.com/destinations/puerto-rico/culebra-vieques"
          },
          {
            "name": "El Yunque",
            "url": "https://www.lonelyplanet.com/destinations/puerto-rico/eastern-puerto-rico/el-yunque"
          },
          {
            "name": "El Yunque & East Coast",
            "url": "https://www.lonelyplanet.com/destinations/puerto-rico/el-yunque-east-coast"
          },
          {
            "name": "North Coast",
            "url": "https://www.lonelyplanet.com/destinations/puerto-rico/north-coast"
          },
          {
            "name": "Ponce",
            "url": "https://www.lonelyplanet.com/destinations/puerto-rico/southern-and-western-puerto-rico/ponce"
          },
          {
            "name": "Rincón",
            "url": "https://www.lonelyplanet.com/destinations/puerto-rico/southern-and-western-puerto-rico/rincon"
          },
          {
            "name": "San Juan",
            "url": "https://www.lonelyplanet.com/destinations/puerto-rico/san-juan"
          },
          {
            "name": "Vieques",
            "url": "https://www.lonelyplanet.com/destinations/puerto-rico/eastern-puerto-rico/vieques"
          }
        ]
      },
      {
        "region": "CARIBBEAN",
        "country": "St Kitts & Nevis",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/st-kitts-and-nevis",
        "cities": [
          {
            "name": "Nevis",
            "url": "https://www.lonelyplanet.com/destinations/st-kitts-and-nevis/nevis"
          }
        ]
      },
      {
        "region": "CARIBBEAN",
        "country": "St Vincent & the Grenadines",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/st-vincent-and-the-grenadines",
        "cities": [
          {
            "name": "Bequia",
            "url": "https://www.lonelyplanet.com/destinations/st-vincent-and-the-grenadines/bequia"
          }
        ]
      },
      {
        "region": "CARIBBEAN",
        "country": "The Bahamas",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/the-bahamas",
        "cities": [
          {
            "name": "Eleuthera",
            "url": "https://www.lonelyplanet.com/destinations/the-bahamas/out-islands/eleuthera"
          },
          {
            "name": "Grand Bahama",
            "url": "https://www.lonelyplanet.com/destinations/the-bahamas/grand-bahama"
          },
          {
            "name": "Nassau",
            "url": "https://www.lonelyplanet.com/destinations/the-bahamas/new-providence/nassau"
          },
          {
            "name": "The Exumas",
            "url": "https://www.lonelyplanet.com/destinations/the-bahamas/out-islands/exumas"
          }
        ]
      },
      {
        "region": "CARIBBEAN",
        "country": "US Virgin Islands",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/us-virgin-islands",
        "cities": [
          {
            "name": "St Croix",
            "url": "https://www.lonelyplanet.com/destinations/us-virgin-islands/st-croix"
          },
          {
            "name": "St John",
            "url": "https://www.lonelyplanet.com/destinations/us-virgin-islands/st-john"
          }
        ]
      }
    ]
  },
  {
    "region": "CENTRAL AMERICA",
    "countries": [
      {
        "region": "CENTRAL AMERICA",
        "country": "Albania",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/albania",
        "cities": [
          {
            "name": "Berat",
            "url": "https://www.lonelyplanet.com/destinations/albania/central-albania/berat"
          },
          {
            "name": "Durrës",
            "url": "https://www.lonelyplanet.com/destinations/albania/durres"
          },
          {
            "name": "Gjirokastra",
            "url": "https://www.lonelyplanet.com/destinations/albania/gjirokastra"
          },
          {
            "name": "Saranda",
            "url": "https://www.lonelyplanet.com/destinations/albania/southern-albania/saranda"
          },
          {
            "name": "Shkodra",
            "url": "https://www.lonelyplanet.com/destinations/albania/northern-albania/shkodra"
          },
          {
            "name": "Theth",
            "url": "https://www.lonelyplanet.com/destinations/albania/theth"
          },
          {
            "name": "Tirana",
            "url": "https://www.lonelyplanet.com/destinations/albania/tirana"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Andorra",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/andorra",
        "cities": [
          {
            "name": "Andorra la Vella",
            "url": "https://www.lonelyplanet.com/destinations/andorra/andorra-la-vella"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Armenia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/armenia",
        "cities": [
          {
            "name": "Lake Sevan",
            "url": "https://www.lonelyplanet.com/destinations/armenia/lake-sevan"
          },
          {
            "name": "Yerevan",
            "url": "https://www.lonelyplanet.com/destinations/armenia/yerevan"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Austria",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/austria",
        "cities": [
          {
            "name": "Graz",
            "url": "https://www.lonelyplanet.com/destinations/austria/the-south/graz"
          },
          {
            "name": "Hallstatt",
            "url": "https://www.lonelyplanet.com/destinations/austria/salzkammergut/hallstatt"
          },
          {
            "name": "Hohe Tauern National Park",
            "url": "https://www.lonelyplanet.com/destinations/austria/tirol/hohe-tauern-national-park"
          },
          {
            "name": "Innsbruck",
            "url": "https://www.lonelyplanet.com/destinations/austria/tirol/innsbruck"
          },
          {
            "name": "Klagenfurt",
            "url": "https://www.lonelyplanet.com/destinations/austria/the-south/klagenfurt"
          },
          {
            "name": "Linz",
            "url": "https://www.lonelyplanet.com/destinations/austria/the-danube-valley/linz"
          },
          {
            "name": "Salzburg",
            "url": "https://www.lonelyplanet.com/destinations/austria/salzburg"
          },
          {
            "name": "Salzburg & Salzburgerland",
            "url": "https://www.lonelyplanet.com/destinations/austria/salzburg-salzburgerland"
          },
          {
            "name": "The Danube Valley",
            "url": "https://www.lonelyplanet.com/destinations/austria/the-danube-valley"
          },
          {
            "name": "The Salzkammergut",
            "url": "https://www.lonelyplanet.com/destinations/austria/salzkammergut"
          },
          {
            "name": "Tyrol",
            "url": "https://www.lonelyplanet.com/destinations/austria/tirol"
          },
          {
            "name": "Vienna",
            "url": "https://www.lonelyplanet.com/destinations/austria/vienna"
          },
          {
            "name": "Zell am See",
            "url": "https://www.lonelyplanet.com/destinations/austria/zell-am-see"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Azerbaijan",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/azerbaijan",
        "cities": [
          {
            "name": "Baku",
            "url": "https://www.lonelyplanet.com/destinations/azerbaijan/baku-baki"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Belarus",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/belarus",
        "cities": [
          {
            "name": "Minsk",
            "url": "https://www.lonelyplanet.com/destinations/belarus/minsk"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Belgium",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/belgium",
        "cities": [
          {
            "name": "Antwerp",
            "url": "https://www.lonelyplanet.com/destinations/belgium/flanders/antwerp"
          },
          {
            "name": "Bruges",
            "url": "https://www.lonelyplanet.com/destinations/belgium/flanders/bruges"
          },
          {
            "name": "Brussels",
            "url": "https://www.lonelyplanet.com/destinations/belgium/brussels"
          },
          {
            "name": "Ghent",
            "url": "https://www.lonelyplanet.com/destinations/belgium/flanders/ghent"
          },
          {
            "name": "Leuven",
            "url": "https://www.lonelyplanet.com/destinations/belgium/leuven"
          },
          {
            "name": "Liège",
            "url": "https://www.lonelyplanet.com/destinations/belgium/wallonia/liege"
          },
          {
            "name": "Namur",
            "url": "https://www.lonelyplanet.com/destinations/belgium/wallonia/namur"
          },
          {
            "name": "Northwest Belgium",
            "url": "https://www.lonelyplanet.com/destinations/belgium/flanders"
          },
          {
            "name": "Ostend",
            "url": "https://www.lonelyplanet.com/destinations/belgium/ostend"
          },
          {
            "name": "The Ardennes",
            "url": "https://www.lonelyplanet.com/destinations/belgium/the-ardennes"
          },
          {
            "name": "Wallonia",
            "url": "https://www.lonelyplanet.com/destinations/belgium/wallonia-1342569"
          },
          {
            "name": "Ypres",
            "url": "https://www.lonelyplanet.com/destinations/belgium/flanders/ypres"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Belize",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/belize",
        "cities": [
          {
            "name": "Ambergris Caye",
            "url": "https://www.lonelyplanet.com/destinations/belize/the-northern-cayes/ambergris-caye-and-san-pedro"
          },
          {
            "name": "Belize City",
            "url": "https://www.lonelyplanet.com/destinations/belize/belize-city"
          },
          {
            "name": "Caye Caulker",
            "url": "https://www.lonelyplanet.com/destinations/belize/the-northern-cayes/caye-caulker"
          },
          {
            "name": "Hopkins",
            "url": "https://www.lonelyplanet.com/destinations/belize/hopkins"
          },
          {
            "name": "Placencia",
            "url": "https://www.lonelyplanet.com/destinations/belize/southern-belize/placencia"
          },
          {
            "name": "San Ignacio",
            "url": "https://www.lonelyplanet.com/destinations/belize/western-belize/san-ignacio-cayo"
          },
          {
            "name": "Southern Belize",
            "url": "https://www.lonelyplanet.com/destinations/belize/southern-belize"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Bosnia & Hercegovina",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/bosnia-and-hercegovina",
        "cities": [
          {
            "name": "Banja Luka",
            "url": "https://www.lonelyplanet.com/destinations/bosnia-and-hercegovina/central-and-northern-bosnia-and-hercegovina/banja-luka"
          },
          {
            "name": "Mostar",
            "url": "https://www.lonelyplanet.com/destinations/bosnia-and-hercegovina/southern-bosnia-and-hercegovina/mostar"
          },
          {
            "name": "Sarajevo",
            "url": "https://www.lonelyplanet.com/destinations/bosnia-and-hercegovina/sarajevo"
          },
          {
            "name": "Sutjeska National Park",
            "url": "https://www.lonelyplanet.com/destinations/bosnia-hercegovina/sutjeska-national-park"
          },
          {
            "name": "Trebinje",
            "url": "https://www.lonelyplanet.com/destinations/bosnia-hercegovina/trebinje"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Bulgaria",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/bulgaria",
        "cities": [
          {
            "name": "Black Sea Coast",
            "url": "https://www.lonelyplanet.com/destinations/bulgaria/black-sea-coast"
          },
          {
            "name": "Burgas",
            "url": "https://www.lonelyplanet.com/destinations/bulgaria/black-sea-coast/burgas"
          },
          {
            "name": "Plovdiv",
            "url": "https://www.lonelyplanet.com/destinations/bulgaria/plovdiv-and-rodopi-mountains/plovdiv"
          },
          {
            "name": "Ruse",
            "url": "https://www.lonelyplanet.com/destinations/bulgaria/central-balkans/ruse"
          },
          {
            "name": "Sofia",
            "url": "https://www.lonelyplanet.com/destinations/bulgaria/sofia"
          },
          {
            "name": "Varna",
            "url": "https://www.lonelyplanet.com/destinations/bulgaria/black-sea-coast/varna"
          },
          {
            "name": "Veliko Târnovo",
            "url": "https://www.lonelyplanet.com/destinations/bulgaria/central-balkans/veliko-tarnovo"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Costa Rica",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/costa-rica",
        "cities": [
          {
            "name": "Cahuita",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/caribbean-coast/cahuita"
          },
          {
            "name": "Caribbean Coast",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/caribbean-coast"
          },
          {
            "name": "Central Pacific Coast",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/central-pacific-coast"
          },
          {
            "name": "Jacó",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/central-pacific-coast/jaco"
          },
          {
            "name": "La Fortuna",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/northwestern-costa-rica/la-fortuna-and-around"
          },
          {
            "name": "Liberia",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/northwestern-costa-rica/liberia"
          },
          {
            "name": "Mal País & Santa Teresa",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/peninsula-de-nicoya/mal-pais-and-santa-teresa"
          },
          {
            "name": "Monteverde & Santa Elena",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/northwestern-costa-rica/monteverde-and-santa-elena"
          },
          {
            "name": "Montezuma",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/peninsula-de-nicoya/montezuma"
          },
          {
            "name": "Northwestern Costa Rica",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/northwestern-costa-rica"
          },
          {
            "name": "Parque Nacional Corcovado",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/peninsula-de-osa-and-golfo-dulce/parque-nacional-corcovado"
          },
          {
            "name": "Parque Nacional Manuel Antonio & Around",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/central-pacific-coast/quepos-and-manuel-antonio"
          },
          {
            "name": "Parque Nacional Volcán Arenal",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/parque-nacional-volcan-arenal"
          },
          {
            "name": "Península de Nicoya",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/peninsula-de-nicoya"
          },
          {
            "name": "Playa Sámara",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/peninsula-de-nicoya/playa-samara"
          },
          {
            "name": "Playa Tamarindo",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/peninsula-de-nicoya/playa-tamarindo"
          },
          {
            "name": "Puerto Jiménez",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/peninsula-de-osa-and-golfo-dulce/puerto-jimenez"
          },
          {
            "name": "Puerto Limón",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/caribbean-coast/puerto-limon"
          },
          {
            "name": "Puerto Viejo de Talamanca",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/caribbean-coast/puerto-viejo-de-talamanca"
          },
          {
            "name": "Puntarenas",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/central-pacific-coast/puntarenas"
          },
          {
            "name": "Quepos",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/central-pacific-coast/quepos"
          },
          {
            "name": "San José",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/san-jose"
          },
          {
            "name": "Southern Costa Rica & Península de Osa",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/southern-costa-rica"
          },
          {
            "name": "Tortuguero Village",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/caribbean-coast/tortuguero-village"
          },
          {
            "name": "Uvita",
            "url": "https://www.lonelyplanet.com/destinations/costa-rica/central-pacific-coast/uvita"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Croatia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/croatia",
        "cities": [
          {
            "name": "Bol",
            "url": "https://www.lonelyplanet.com/destinations/croatia/bol"
          },
          {
            "name": "Brač Island",
            "url": "https://www.lonelyplanet.com/destinations/croatia/brac-island"
          },
          {
            "name": "Cavtat",
            "url": "https://www.lonelyplanet.com/destinations/croatia/cavtat"
          },
          {
            "name": "Cres Island",
            "url": "https://www.lonelyplanet.com/destinations/croatia/cres-island"
          },
          {
            "name": "Dubrovnik",
            "url": "https://www.lonelyplanet.com/destinations/croatia/dubrovnik"
          },
          {
            "name": "Elafiti Islands",
            "url": "https://www.lonelyplanet.com/destinations/croatia/elafiti-islands"
          },
          {
            "name": "Hvar Island",
            "url": "https://www.lonelyplanet.com/destinations/croatia/hvar-island"
          },
          {
            "name": "Hvar Town",
            "url": "https://www.lonelyplanet.com/destinations/croatia/dalmatia/hvar-island"
          },
          {
            "name": "Istria",
            "url": "https://www.lonelyplanet.com/destinations/croatia/istria"
          },
          {
            "name": "Korčula Island",
            "url": "https://www.lonelyplanet.com/destinations/croatia/dalmatia/korcula-island"
          },
          {
            "name": "Kornati Islands",
            "url": "https://www.lonelyplanet.com/destinations/croatia/kornati-islands"
          },
          {
            "name": "Krka National Park",
            "url": "https://www.lonelyplanet.com/destinations/croatia/krka-national-park"
          },
          {
            "name": "Krk Island",
            "url": "https://www.lonelyplanet.com/destinations/croatia/gulf-of-kvarner/krk-island"
          },
          {
            "name": "Kvarner",
            "url": "https://www.lonelyplanet.com/destinations/croatia/gulf-of-kvarner"
          },
          {
            "name": "Makarska",
            "url": "https://www.lonelyplanet.com/destinations/croatia/makarska"
          },
          {
            "name": "Mali Lošinj",
            "url": "https://www.lonelyplanet.com/destinations/croatia/mali-losinj"
          },
          {
            "name": "Mljet Island",
            "url": "https://www.lonelyplanet.com/destinations/croatia/dalmatia/mljet-island"
          },
          {
            "name": "Motovun",
            "url": "https://www.lonelyplanet.com/destinations/croatia/motovun"
          },
          {
            "name": "Northern Dalmatia",
            "url": "https://www.lonelyplanet.com/destinations/croatia/dalmatia"
          },
          {
            "name": "Opatija",
            "url": "https://www.lonelyplanet.com/destinations/croatia/gulf-of-kvarner/opatija"
          },
          {
            "name": "Pag Island",
            "url": "https://www.lonelyplanet.com/destinations/croatia/pag-island"
          },
          {
            "name": "Pakleni Islands",
            "url": "https://www.lonelyplanet.com/destinations/croatia/pakleni-islands"
          },
          {
            "name": "Pelješac Peninsula",
            "url": "https://www.lonelyplanet.com/destinations/croatia/peljesac-peninsula"
          },
          {
            "name": "Plitvice Lakes National Park",
            "url": "https://www.lonelyplanet.com/destinations/croatia/plitvice-lakes-national-park"
          },
          {
            "name": "Poreč",
            "url": "https://www.lonelyplanet.com/destinations/croatia/istria/porec"
          },
          {
            "name": "Pula",
            "url": "https://www.lonelyplanet.com/destinations/croatia/istria/pula"
          },
          {
            "name": "Rab Island",
            "url": "https://www.lonelyplanet.com/destinations/croatia/rab-island"
          },
          {
            "name": "Rijeka",
            "url": "https://www.lonelyplanet.com/destinations/croatia/gulf-of-kvarner/rijeka"
          },
          {
            "name": "Rovinj",
            "url": "https://www.lonelyplanet.com/destinations/croatia/istria/rovinj"
          },
          {
            "name": "Šibenik",
            "url": "https://www.lonelyplanet.com/destinations/croatia/sibenik"
          },
          {
            "name": "Split",
            "url": "https://www.lonelyplanet.com/destinations/croatia/dalmatia/split"
          },
          {
            "name": "Stari Grad",
            "url": "https://www.lonelyplanet.com/destinations/croatia/stari-grad"
          },
          {
            "name": "Trogir",
            "url": "https://www.lonelyplanet.com/destinations/croatia/dalmatia/trogir"
          },
          {
            "name": "Vis Island",
            "url": "https://www.lonelyplanet.com/destinations/croatia/vis-island"
          },
          {
            "name": "Zadar",
            "url": "https://www.lonelyplanet.com/destinations/croatia/dalmatia/zadar"
          },
          {
            "name": "Zagreb",
            "url": "https://www.lonelyplanet.com/destinations/croatia/zagreb"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Cyprus",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/cyprus",
        "cities": [
          {
            "name": "Kyrenia (Girne)",
            "url": "https://www.lonelyplanet.com/destinations/cyprus/north-cyprus/kyrenia-girne-and-the-northcoast"
          },
          {
            "name": "Larnaka",
            "url": "https://www.lonelyplanet.com/destinations/cyprus/the-republic-of-cyprus/larnaka"
          },
          {
            "name": "Lemesos (Limassol)",
            "url": "https://www.lonelyplanet.com/destinations/cyprus/the-republic-of-cyprus/lemesos-limasol"
          },
          {
            "name": "Nicosia (Lefkosia)",
            "url": "https://www.lonelyplanet.com/destinations/cyprus/the-republic-of-cyprus/lefkosia-south-nicosia"
          },
          {
            "name": "North Nicosia (Lefkoşa)",
            "url": "https://www.lonelyplanet.com/destinations/cyprus/north-cyprus/lefkosa-north-nicosia"
          },
          {
            "name": "Pafos",
            "url": "https://www.lonelyplanet.com/destinations/cyprus/the-republic-of-cyprus/pafos"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Czechia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/czech-republic",
        "cities": [
          {
            "name": "Bohemia",
            "url": "https://www.lonelyplanet.com/destinations/czech-republic/bohemia"
          },
          {
            "name": "Brno",
            "url": "https://www.lonelyplanet.com/destinations/czech-republic/moravia/brno"
          },
          {
            "name": "Karlovy Vary",
            "url": "https://www.lonelyplanet.com/destinations/czech-republic/bohemia/karlovy-vary"
          },
          {
            "name": "Kutná Hora",
            "url": "https://www.lonelyplanet.com/destinations/czech-republic/kutna-hora"
          },
          {
            "name": "Moravia",
            "url": "https://www.lonelyplanet.com/destinations/czech-republic/moravia"
          },
          {
            "name": "Plzeň",
            "url": "https://www.lonelyplanet.com/destinations/czech-republic/bohemia/plzen"
          },
          {
            "name": "Prague",
            "url": "https://www.lonelyplanet.com/destinations/czech-republic/prague"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Denmark",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/denmark",
        "cities": [
          {
            "name": "Aalborg",
            "url": "https://www.lonelyplanet.com/destinations/denmark/jutland/aalborg"
          },
          {
            "name": "Aarhus",
            "url": "https://www.lonelyplanet.com/destinations/denmark/aarhus"
          },
          {
            "name": "Billund",
            "url": "https://www.lonelyplanet.com/destinations/denmark/billund"
          },
          {
            "name": "Bornholm",
            "url": "https://www.lonelyplanet.com/destinations/denmark/bornholm"
          },
          {
            "name": "Central Jutland",
            "url": "https://www.lonelyplanet.com/destinations/denmark/central-jutland"
          },
          {
            "name": "Copenhagen",
            "url": "https://www.lonelyplanet.com/destinations/denmark/copenhagen"
          },
          {
            "name": "Helsingør",
            "url": "https://www.lonelyplanet.com/destinations/denmark/zealand/helsingor-elsinore"
          },
          {
            "name": "Odense",
            "url": "https://www.lonelyplanet.com/destinations/denmark/funen/odense"
          },
          {
            "name": "Skagen",
            "url": "https://www.lonelyplanet.com/destinations/denmark/jutland/skagen"
          },
          {
            "name": "Zealand",
            "url": "https://www.lonelyplanet.com/destinations/denmark/zealand"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "El Salvador",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/el-salvador",
        "cities": [
          {
            "name": "San Salvador",
            "url": "https://www.lonelyplanet.com/destinations/el-salvador/san-salvador"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "England",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/england",
        "cities": [
          {
            "name": "Bath",
            "url": "https://www.lonelyplanet.com/destinations/england/southwest-england/bath"
          },
          {
            "name": "Birmingham",
            "url": "https://www.lonelyplanet.com/destinations/england/the-midlands/birmingham"
          },
          {
            "name": "Brighton & Hove",
            "url": "https://www.lonelyplanet.com/destinations/england/southeast-england/brighton-and-hove"
          },
          {
            "name": "Bristol",
            "url": "https://www.lonelyplanet.com/destinations/england/southwest-england/bristol"
          },
          {
            "name": "Cambridge",
            "url": "https://www.lonelyplanet.com/destinations/england/eastern-england/cambridge"
          },
          {
            "name": "Cornwall",
            "url": "https://www.lonelyplanet.com/destinations/england/southwest-england/cornwall"
          },
          {
            "name": "Cumbria & the Lakes",
            "url": "https://www.lonelyplanet.com/destinations/england/cumbria-and-the-lakes"
          },
          {
            "name": "Dartmoor National Park",
            "url": "https://www.lonelyplanet.com/destinations/england/southwest-england/dartmoor-national-park"
          },
          {
            "name": "Devon",
            "url": "https://www.lonelyplanet.com/destinations/england/southwest-england/devon"
          },
          {
            "name": "Devon & Cornwall",
            "url": "https://www.lonelyplanet.com/destinations/england/devon-cornwall-1341739"
          },
          {
            "name": "Dorset",
            "url": "https://www.lonelyplanet.com/destinations/england/southwest-england/dorset"
          },
          {
            "name": "Dover",
            "url": "https://www.lonelyplanet.com/destinations/england/southeast-england/dover"
          },
          {
            "name": "Exmoor National Park",
            "url": "https://www.lonelyplanet.com/destinations/england/southwest-england/exmoor-national-park"
          },
          {
            "name": "Isle of Man",
            "url": "https://www.lonelyplanet.com/destinations/england/northwest-england/isle-of-man"
          },
          {
            "name": "Isle of Wight",
            "url": "https://www.lonelyplanet.com/destinations/england/southeast-england/isle-of-wight"
          },
          {
            "name": "Kent",
            "url": "https://www.lonelyplanet.com/destinations/england/southeast-england/kent"
          },
          {
            "name": "Leeds",
            "url": "https://www.lonelyplanet.com/destinations/england/yorkshire/leeds"
          },
          {
            "name": "Liverpool",
            "url": "https://www.lonelyplanet.com/destinations/england/northwest-england/liverpool"
          },
          {
            "name": "London",
            "url": "https://www.lonelyplanet.com/destinations/england/london"
          },
          {
            "name": "Manchester",
            "url": "https://www.lonelyplanet.com/destinations/england/northwest-england/manchester"
          },
          {
            "name": "Newcastle-upon-Tyne",
            "url": "https://www.lonelyplanet.com/destinations/england/northeast-england/newcastle-upon-tyne"
          },
          {
            "name": "Norfolk",
            "url": "https://www.lonelyplanet.com/destinations/england/eastern-england/norfolk"
          },
          {
            "name": "Northeast England",
            "url": "https://www.lonelyplanet.com/destinations/england/northeast-england"
          },
          {
            "name": "Northumberland Coast",
            "url": "https://www.lonelyplanet.com/destinations/england/northeast-england/northumberland"
          },
          {
            "name": "North York Moors National Park",
            "url": "https://www.lonelyplanet.com/destinations/england/yorkshire/north-york-moors-national-park"
          },
          {
            "name": "Nottingham",
            "url": "https://www.lonelyplanet.com/destinations/england/the-midlands/nottingham"
          },
          {
            "name": "Oxford",
            "url": "https://www.lonelyplanet.com/destinations/england/oxfordshire/oxford"
          },
          {
            "name": "Oxford & the Cotswolds",
            "url": "https://www.lonelyplanet.com/destinations/england/oxford-the-cotswolds"
          },
          {
            "name": "Peak District",
            "url": "https://www.lonelyplanet.com/destinations/england/the-midlands/peak-district"
          },
          {
            "name": "Plymouth",
            "url": "https://www.lonelyplanet.com/destinations/england/southwest-england/plymouth"
          },
          {
            "name": "Rye",
            "url": "https://www.lonelyplanet.com/destinations/england/southeast-england/rye"
          },
          {
            "name": "Southeast England",
            "url": "https://www.lonelyplanet.com/destinations/england/southeast-england"
          },
          {
            "name": "Southwest England",
            "url": "https://www.lonelyplanet.com/destinations/england/southwest-england"
          },
          {
            "name": "Stonehenge",
            "url": "https://www.lonelyplanet.com/destinations/england/southwest-england/stonehenge"
          },
          {
            "name": "Stratford-upon-Avon",
            "url": "https://www.lonelyplanet.com/destinations/england/the-midlands/stratford-upon-avon"
          },
          {
            "name": "The Cotswolds",
            "url": "https://www.lonelyplanet.com/destinations/england/the-cotswolds"
          },
          {
            "name": "The Lake District",
            "url": "https://www.lonelyplanet.com/destinations/england/cumbria-and-the-lakes/lake-district"
          },
          {
            "name": "The Midlands & the Marches",
            "url": "https://www.lonelyplanet.com/destinations/england/the-midlands-the-marches"
          },
          {
            "name": "Torquay",
            "url": "https://www.lonelyplanet.com/destinations/england/southwest-england/torquay-and-paignton"
          },
          {
            "name": "Whitby",
            "url": "https://www.lonelyplanet.com/destinations/england/yorkshire/whitby"
          },
          {
            "name": "Wiltshire",
            "url": "https://www.lonelyplanet.com/destinations/england/southwest-england/wiltshire"
          },
          {
            "name": "Windsor & Eton",
            "url": "https://www.lonelyplanet.com/destinations/england/southeast-england/windsor-and-eton"
          },
          {
            "name": "York",
            "url": "https://www.lonelyplanet.com/destinations/england/yorkshire/york"
          },
          {
            "name": "Yorkshire",
            "url": "https://www.lonelyplanet.com/destinations/england/yorkshire"
          },
          {
            "name": "Yorkshire Dales National Park",
            "url": "https://www.lonelyplanet.com/destinations/england/yorkshire/yorkshire-dales-national-park"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Estonia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/estonia",
        "cities": [
          {
            "name": "Lahemaa National Park",
            "url": "https://www.lonelyplanet.com/destinations/estonia/northeastern-estonia/lahemaa-national-park"
          },
          {
            "name": "Tallinn",
            "url": "https://www.lonelyplanet.com/destinations/estonia/tallinn"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Finland",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/finland",
        "cities": [
          {
            "name": "Helsinki",
            "url": "https://www.lonelyplanet.com/destinations/finland/helsinki"
          },
          {
            "name": "Lapland",
            "url": "https://www.lonelyplanet.com/destinations/finland/lapland"
          },
          {
            "name": "Rovaniemi",
            "url": "https://www.lonelyplanet.com/destinations/finland/lapland/rovaniemi"
          },
          {
            "name": "Tampere",
            "url": "https://www.lonelyplanet.com/destinations/finland/southwestern-finland/tampere"
          },
          {
            "name": "Turku",
            "url": "https://www.lonelyplanet.com/destinations/finland/south-coast/turku"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "France",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/france",
        "cities": [
          {
            "name": "Aix-en-Provence",
            "url": "https://www.lonelyplanet.com/destinations/france/provence/aix-en-provence"
          },
          {
            "name": "Ajaccio",
            "url": "https://www.lonelyplanet.com/destinations/france/corsica/ajaccio"
          },
          {
            "name": "Alsace",
            "url": "https://www.lonelyplanet.com/destinations/france/alsace-and-lorraine/alsace"
          },
          {
            "name": "Alsace & Lorraine",
            "url": "https://www.lonelyplanet.com/destinations/france/alsace-and-lorraine"
          },
          {
            "name": "Amboise",
            "url": "https://www.lonelyplanet.com/destinations/france/the-loire/amboise"
          },
          {
            "name": "Amiens",
            "url": "https://www.lonelyplanet.com/destinations/france/northern-france/amiens"
          },
          {
            "name": "Angers",
            "url": "https://www.lonelyplanet.com/destinations/france/the-loire/angers"
          },
          {
            "name": "Annecy",
            "url": "https://www.lonelyplanet.com/destinations/france/the-french-alps/annecy"
          },
          {
            "name": "Antibes",
            "url": "https://www.lonelyplanet.com/destinations/france/cote-dazur/antibes-juan-les-pins"
          },
          {
            "name": "Arcachon",
            "url": "https://www.lonelyplanet.com/destinations/france/southwestern-france/arcachon"
          },
          {
            "name": "Arles",
            "url": "https://www.lonelyplanet.com/destinations/france/provence/arles"
          },
          {
            "name": "Arras",
            "url": "https://www.lonelyplanet.com/destinations/france/arras"
          },
          {
            "name": "Atlantic Coast",
            "url": "https://www.lonelyplanet.com/destinations/france/atlantic-coast"
          },
          {
            "name": "Auvergne",
            "url": "https://www.lonelyplanet.com/destinations/france/auvergne"
          },
          {
            "name": "Avignon",
            "url": "https://www.lonelyplanet.com/destinations/france/provence/avignon"
          },
          {
            "name": "Bastia",
            "url": "https://www.lonelyplanet.com/destinations/france/corsica/bastia"
          },
          {
            "name": "Bayonne",
            "url": "https://www.lonelyplanet.com/destinations/france/southwestern-france/bayonne"
          },
          {
            "name": "Beaune",
            "url": "https://www.lonelyplanet.com/destinations/france/burgundy-and-the-rhone/beaune"
          },
          {
            "name": "Besançon",
            "url": "https://www.lonelyplanet.com/destinations/france/the-jura/besancon"
          },
          {
            "name": "Béziers",
            "url": "https://www.lonelyplanet.com/destinations/france/beziers"
          },
          {
            "name": "Biarritz",
            "url": "https://www.lonelyplanet.com/destinations/france/southwestern-france/biarritz"
          },
          {
            "name": "Blois",
            "url": "https://www.lonelyplanet.com/destinations/france/the-loire/blois"
          },
          {
            "name": "Bonifacio",
            "url": "https://www.lonelyplanet.com/destinations/france/corsica/bonifacio"
          },
          {
            "name": "Bordeaux",
            "url": "https://www.lonelyplanet.com/destinations/france/southwestern-france/bordeaux"
          },
          {
            "name": "Brittany",
            "url": "https://www.lonelyplanet.com/destinations/france/brittany"
          },
          {
            "name": "Brittany & Normandy",
            "url": "https://www.lonelyplanet.com/destinations/france/brittany-and-normandy"
          },
          {
            "name": "Burgundy",
            "url": "https://www.lonelyplanet.com/destinations/france/burgundy-and-the-rhone"
          },
          {
            "name": "Caen",
            "url": "https://www.lonelyplanet.com/destinations/france/normandy/caen"
          },
          {
            "name": "Calvi",
            "url": "https://www.lonelyplanet.com/destinations/france/corsica/calvi"
          },
          {
            "name": "Camargue",
            "url": "https://www.lonelyplanet.com/destinations/france/camargue"
          },
          {
            "name": "Cannes",
            "url": "https://www.lonelyplanet.com/destinations/france/cote-dazur/cannes"
          },
          {
            "name": "Carcassonne",
            "url": "https://www.lonelyplanet.com/destinations/france/languedoc-roussillon/carcassonne"
          },
          {
            "name": "Cassis",
            "url": "https://www.lonelyplanet.com/destinations/france/cassis"
          },
          {
            "name": "Chambéry",
            "url": "https://www.lonelyplanet.com/destinations/france/chambery"
          },
          {
            "name": "Chamonix",
            "url": "https://www.lonelyplanet.com/destinations/france/the-french-alps/chamonix"
          },
          {
            "name": "Champagne",
            "url": "https://www.lonelyplanet.com/destinations/france/champagne"
          },
          {
            "name": "Chartres",
            "url": "https://www.lonelyplanet.com/destinations/france/chartres"
          },
          {
            "name": "Clermont-Ferrand",
            "url": "https://www.lonelyplanet.com/destinations/france/clermont-ferrand"
          },
          {
            "name": "Collioure",
            "url": "https://www.lonelyplanet.com/destinations/france/collioure"
          },
          {
            "name": "Colmar",
            "url": "https://www.lonelyplanet.com/destinations/france/colmar"
          },
          {
            "name": "Corsica",
            "url": "https://www.lonelyplanet.com/destinations/france/corsica"
          },
          {
            "name": "Corte",
            "url": "https://www.lonelyplanet.com/destinations/france/corsica/corte-corti"
          },
          {
            "name": "Côte d'Azur",
            "url": "https://www.lonelyplanet.com/destinations/france/cote-d-azur"
          },
          {
            "name": "Dijon",
            "url": "https://www.lonelyplanet.com/destinations/france/burgundy-and-the-rhone/dijon"
          },
          {
            "name": "Dunkirk",
            "url": "https://www.lonelyplanet.com/destinations/france/northern-france/dunkirk"
          },
          {
            "name": "Épernay",
            "url": "https://www.lonelyplanet.com/destinations/france/champagne/epernay"
          },
          {
            "name": "Étretat",
            "url": "https://www.lonelyplanet.com/destinations/france/etretat"
          },
          {
            "name": "Èze",
            "url": "https://www.lonelyplanet.com/destinations/france/eze"
          },
          {
            "name": "Fontainebleau",
            "url": "https://www.lonelyplanet.com/destinations/france/fontainebleau"
          },
          {
            "name": "French Alps & the Jura Mountains",
            "url": "https://www.lonelyplanet.com/destinations/france/the-french-alps"
          },
          {
            "name": "French Basque Country",
            "url": "https://www.lonelyplanet.com/destinations/france/french-basque-country"
          },
          {
            "name": "Giverny",
            "url": "https://www.lonelyplanet.com/destinations/france/giverny"
          },
          {
            "name": "Gorges du Verdon",
            "url": "https://www.lonelyplanet.com/destinations/france/gorges-du-verdon"
          },
          {
            "name": "Grasse",
            "url": "https://www.lonelyplanet.com/destinations/france/cote-dazur/grasse"
          },
          {
            "name": "Grenoble",
            "url": "https://www.lonelyplanet.com/destinations/france/the-french-alps/grenoble"
          },
          {
            "name": "Honfleur",
            "url": "https://www.lonelyplanet.com/destinations/france/honfleur"
          },
          {
            "name": "Île de Ré",
            "url": "https://www.lonelyplanet.com/destinations/france/ile-de-re"
          },
          {
            "name": "Languedoc-Roussillon",
            "url": "https://www.lonelyplanet.com/destinations/france/languedoc-roussillon"
          },
          {
            "name": "La Rochelle",
            "url": "https://www.lonelyplanet.com/destinations/france/southwestern-france/la-rochelle"
          },
          {
            "name": "Le Havre",
            "url": "https://www.lonelyplanet.com/destinations/france/normandy/le-havre"
          },
          {
            "name": "Les Calanques",
            "url": "https://www.lonelyplanet.com/destinations/france/les-calanques"
          },
          {
            "name": "Lille",
            "url": "https://www.lonelyplanet.com/destinations/france/northern-france/lille"
          },
          {
            "name": "Limoges",
            "url": "https://www.lonelyplanet.com/destinations/france/limoges"
          },
          {
            "name": "Lyon",
            "url": "https://www.lonelyplanet.com/destinations/france/burgundy-and-the-rhone/lyon"
          },
          {
            "name": "Lyon & the Rhône Valley",
            "url": "https://www.lonelyplanet.com/destinations/france/lyon-the-rhone-valley"
          },
          {
            "name": "Marseille",
            "url": "https://www.lonelyplanet.com/destinations/france/provence/marseille"
          },
          {
            "name": "Menton",
            "url": "https://www.lonelyplanet.com/destinations/france/cote-dazur/menton"
          },
          {
            "name": "Metz",
            "url": "https://www.lonelyplanet.com/destinations/france/alsace-and-lorraine/metz"
          },
          {
            "name": "Montpellier",
            "url": "https://www.lonelyplanet.com/destinations/france/languedoc-roussillon/montpellier"
          },
          {
            "name": "Mont St-Michel",
            "url": "https://www.lonelyplanet.com/destinations/france/normandy/mont-st-michel"
          },
          {
            "name": "Nancy",
            "url": "https://www.lonelyplanet.com/destinations/france/alsace-and-lorraine/nancy"
          },
          {
            "name": "Nantes",
            "url": "https://www.lonelyplanet.com/destinations/france/southwestern-france/nantes"
          },
          {
            "name": "Nice",
            "url": "https://www.lonelyplanet.com/destinations/france/nice"
          },
          {
            "name": "Nîmes",
            "url": "https://www.lonelyplanet.com/destinations/france/languedoc-roussillon/nimes"
          },
          {
            "name": "Normandy",
            "url": "https://www.lonelyplanet.com/destinations/france/normandy"
          },
          {
            "name": "Orléans",
            "url": "https://www.lonelyplanet.com/destinations/france/orleans"
          },
          {
            "name": "Parc National des Pyrénées",
            "url": "https://www.lonelyplanet.com/destinations/france/parc-national-des-pyrenees"
          },
          {
            "name": "Parc Naturel Régional des Volcans d'Auvergne",
            "url": "https://www.lonelyplanet.com/destinations/france/parc-naturel-regional-des-volcans-d-auvergne"
          },
          {
            "name": "Paris",
            "url": "https://www.lonelyplanet.com/destinations/france/paris"
          },
          {
            "name": "Perpignan",
            "url": "https://www.lonelyplanet.com/destinations/france/languedoc-roussillon/perpignan"
          },
          {
            "name": "Poitiers",
            "url": "https://www.lonelyplanet.com/destinations/france/southwestern-france/poitiers"
          },
          {
            "name": "Provence",
            "url": "https://www.lonelyplanet.com/destinations/france/provence-1342435"
          },
          {
            "name": "Provence & the Côte d'Azur",
            "url": "https://www.lonelyplanet.com/destinations/france/provence"
          },
          {
            "name": "Reims",
            "url": "https://www.lonelyplanet.com/destinations/france/champagne/reims"
          },
          {
            "name": "Rennes",
            "url": "https://www.lonelyplanet.com/destinations/france/rennes"
          },
          {
            "name": "Rouen",
            "url": "https://www.lonelyplanet.com/destinations/france/normandy/rouen"
          },
          {
            "name": "Sarlat-la-Canéda",
            "url": "https://www.lonelyplanet.com/destinations/france/the-dordogne/sarlat-la-caneda"
          },
          {
            "name": "Sète",
            "url": "https://www.lonelyplanet.com/destinations/france/sete"
          },
          {
            "name": "St-Émilion",
            "url": "https://www.lonelyplanet.com/destinations/france/st-emilion"
          },
          {
            "name": "St-Jean de Luz",
            "url": "https://www.lonelyplanet.com/destinations/france/st-jean-de-luz"
          },
          {
            "name": "St-Jean Pied de Port",
            "url": "https://www.lonelyplanet.com/destinations/france/st-jean-pied-de-port"
          },
          {
            "name": "St-Malo",
            "url": "https://www.lonelyplanet.com/destinations/france/brittany/st-malo"
          },
          {
            "name": "Strasbourg",
            "url": "https://www.lonelyplanet.com/destinations/france/alsace-and-lorraine/strasbourg"
          },
          {
            "name": "St-Tropez",
            "url": "https://www.lonelyplanet.com/destinations/france/st-tropez"
          },
          {
            "name": "The Dordogne",
            "url": "https://www.lonelyplanet.com/destinations/france/the-dordogne"
          },
          {
            "name": "The Dordogne, Limousin & the Lot",
            "url": "https://www.lonelyplanet.com/destinations/france/the-dordogne-limousin-the-lot"
          },
          {
            "name": "The Loire Valley",
            "url": "https://www.lonelyplanet.com/destinations/france/the-loire"
          },
          {
            "name": "The Luberon",
            "url": "https://www.lonelyplanet.com/destinations/france/the-luberon"
          },
          {
            "name": "The Pyrenees",
            "url": "https://www.lonelyplanet.com/destinations/france/the-pyrenees"
          },
          {
            "name": "Toulon",
            "url": "https://www.lonelyplanet.com/destinations/france/cote-dazur/toulon"
          },
          {
            "name": "Toulouse",
            "url": "https://www.lonelyplanet.com/destinations/france/toulouse"
          },
          {
            "name": "Troyes",
            "url": "https://www.lonelyplanet.com/destinations/france/champagne/troyes"
          },
          {
            "name": "Versailles",
            "url": "https://www.lonelyplanet.com/destinations/france/versailles"
          },
          {
            "name": "Villefranche-sur-Mer",
            "url": "https://www.lonelyplanet.com/destinations/france/villefranche-sur-mer"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Georgia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/georgia",
        "cities": [
          {
            "name": "Batumi",
            "url": "https://www.lonelyplanet.com/destinations/georgia/adjara/batumi"
          },
          {
            "name": "Great Caucasus",
            "url": "https://www.lonelyplanet.com/destinations/georgia/great-caucasus"
          },
          {
            "name": "Kakheti",
            "url": "https://www.lonelyplanet.com/destinations/georgia/kakheti"
          },
          {
            "name": "Kutaisi",
            "url": "https://www.lonelyplanet.com/destinations/georgia/western-georgia/kutaisi"
          },
          {
            "name": "Sighnaghi",
            "url": "https://www.lonelyplanet.com/destinations/georgia/kakheti/sighnaghi"
          },
          {
            "name": "Stepantsminda",
            "url": "https://www.lonelyplanet.com/destinations/georgia/the-mountains/kazbegi"
          },
          {
            "name": "Tbilisi",
            "url": "https://www.lonelyplanet.com/destinations/georgia/tbilisi"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Germany",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/germany",
        "cities": [
          {
            "name": "Aachen",
            "url": "https://www.lonelyplanet.com/destinations/germany/north-rhine-westphalia/aachen"
          },
          {
            "name": "Augsburg",
            "url": "https://www.lonelyplanet.com/destinations/germany/bavaria/augsburg"
          },
          {
            "name": "Baden-Baden",
            "url": "https://www.lonelyplanet.com/destinations/germany/baden-wurttemberg/baden-baden"
          },
          {
            "name": "Bamberg",
            "url": "https://www.lonelyplanet.com/destinations/germany/bavaria/bamberg"
          },
          {
            "name": "Bavaria",
            "url": "https://www.lonelyplanet.com/destinations/germany/bavaria"
          },
          {
            "name": "Bavarian Alps",
            "url": "https://www.lonelyplanet.com/destinations/germany/bavarian-alps"
          },
          {
            "name": "Berchtesgaden",
            "url": "https://www.lonelyplanet.com/destinations/germany/bavarian-alps/berchtesgaden"
          },
          {
            "name": "Berlin",
            "url": "https://www.lonelyplanet.com/destinations/germany/berlin"
          },
          {
            "name": "Berlin & Brandenburg",
            "url": "https://www.lonelyplanet.com/destinations/germany/berlin-brandenburg"
          },
          {
            "name": "Bonn",
            "url": "https://www.lonelyplanet.com/destinations/germany/north-rhine-westphalia/bonn"
          },
          {
            "name": "Breisach",
            "url": "https://www.lonelyplanet.com/destinations/germany/breisach"
          },
          {
            "name": "Bremen City",
            "url": "https://www.lonelyplanet.com/destinations/germany/bremen-city"
          },
          {
            "name": "Central Germany",
            "url": "https://www.lonelyplanet.com/destinations/germany/central-germany"
          },
          {
            "name": "Cologne",
            "url": "https://www.lonelyplanet.com/destinations/germany/north-rhine-westphalia/cologne"
          },
          {
            "name": "Cologne & Northern Rhineland",
            "url": "https://www.lonelyplanet.com/destinations/germany/north-rhine-westphalia"
          },
          {
            "name": "Dresden",
            "url": "https://www.lonelyplanet.com/destinations/germany/saxony/dresden"
          },
          {
            "name": "Düsseldorf",
            "url": "https://www.lonelyplanet.com/destinations/germany/north-rhine-westphalia/dusseldorf"
          },
          {
            "name": "Fairy-Tale Road",
            "url": "https://www.lonelyplanet.com/destinations/germany/fairy-tale-road"
          },
          {
            "name": "Frankfurt am Main",
            "url": "https://www.lonelyplanet.com/destinations/germany/frankfurt-am-main"
          },
          {
            "name": "Frankfurt & Southern Rhineland",
            "url": "https://www.lonelyplanet.com/destinations/germany/frankfurt-southern-rhineland"
          },
          {
            "name": "Freiburg",
            "url": "https://www.lonelyplanet.com/destinations/germany/black-forest/freiburg"
          },
          {
            "name": "Füssen",
            "url": "https://www.lonelyplanet.com/destinations/germany/bavaria/fussen"
          },
          {
            "name": "Garmisch-Partenkirchen",
            "url": "https://www.lonelyplanet.com/destinations/germany/bavarian-alps/garmisch-partenkirchen"
          },
          {
            "name": "German Wine Route",
            "url": "https://www.lonelyplanet.com/destinations/germany/german-wine-route"
          },
          {
            "name": "Hamburg",
            "url": "https://www.lonelyplanet.com/destinations/germany/hamburg"
          },
          {
            "name": "Hanover",
            "url": "https://www.lonelyplanet.com/destinations/germany/lower-saxony/hanover"
          },
          {
            "name": "Heidelberg",
            "url": "https://www.lonelyplanet.com/destinations/germany/baden-wurttemberg/heidelberg"
          },
          {
            "name": "Kiel",
            "url": "https://www.lonelyplanet.com/destinations/germany/kiel"
          },
          {
            "name": "Koblenz",
            "url": "https://www.lonelyplanet.com/destinations/germany/koblenz"
          },
          {
            "name": "Konstanz",
            "url": "https://www.lonelyplanet.com/destinations/germany/lake-constance/constance"
          },
          {
            "name": "Lake Constance",
            "url": "https://www.lonelyplanet.com/destinations/germany/lake-constance"
          },
          {
            "name": "Leipzig",
            "url": "https://www.lonelyplanet.com/destinations/germany/saxony/leipzig"
          },
          {
            "name": "Lübeck",
            "url": "https://www.lonelyplanet.com/destinations/germany/schleswig-holstein/lubeck"
          },
          {
            "name": "Mannheim",
            "url": "https://www.lonelyplanet.com/destinations/germany/baden-wurttemberg/mannheim"
          },
          {
            "name": "Mittenwald",
            "url": "https://www.lonelyplanet.com/destinations/germany/mittenwald"
          },
          {
            "name": "Moselle Valley",
            "url": "https://www.lonelyplanet.com/destinations/germany/rhineland-palatinate/moselle-valley"
          },
          {
            "name": "Munich",
            "url": "https://www.lonelyplanet.com/destinations/germany/munich"
          },
          {
            "name": "Munich, Bavaria & the Black Forest",
            "url": "https://www.lonelyplanet.com/destinations/germany/munich-bavaria-the-black-forest"
          },
          {
            "name": "Northern Germany",
            "url": "https://www.lonelyplanet.com/destinations/germany/northern-germany"
          },
          {
            "name": "Nuremberg",
            "url": "https://www.lonelyplanet.com/destinations/germany/bavaria/nuremberg"
          },
          {
            "name": "Passau",
            "url": "https://www.lonelyplanet.com/destinations/germany/bavaria/passau"
          },
          {
            "name": "Potsdam",
            "url": "https://www.lonelyplanet.com/destinations/germany/brandenburg/potsdam"
          },
          {
            "name": "Regensburg",
            "url": "https://www.lonelyplanet.com/destinations/germany/bavaria/regensburg"
          },
          {
            "name": "Rhine Valley",
            "url": "https://www.lonelyplanet.com/destinations/germany/rhineland-palatinate/rhine-valley"
          },
          {
            "name": "Rothenburg ob der Tauber",
            "url": "https://www.lonelyplanet.com/destinations/germany/bavaria/rothenburg-ob-der-tauber"
          },
          {
            "name": "Rügen Island",
            "url": "https://www.lonelyplanet.com/destinations/germany/mecklenburg-western-pomerania/rugen-island"
          },
          {
            "name": "Saxon Switzerland",
            "url": "https://www.lonelyplanet.com/destinations/germany/saxon-switzerland"
          },
          {
            "name": "Spreewald",
            "url": "https://www.lonelyplanet.com/destinations/germany/spreewald"
          },
          {
            "name": "Stuttgart",
            "url": "https://www.lonelyplanet.com/destinations/germany/baden-wurttemberg/stuttgart"
          },
          {
            "name": "Stuttgart & the Black Forest",
            "url": "https://www.lonelyplanet.com/destinations/germany/baden-wurttemberg"
          },
          {
            "name": "The Black Forest",
            "url": "https://www.lonelyplanet.com/destinations/germany/black-forest"
          },
          {
            "name": "Trier",
            "url": "https://www.lonelyplanet.com/destinations/germany/rhineland-palatinate/trier"
          },
          {
            "name": "Ulm",
            "url": "https://www.lonelyplanet.com/destinations/germany/baden-wurttemberg/ulm"
          },
          {
            "name": "Wiesbaden",
            "url": "https://www.lonelyplanet.com/destinations/germany/hesse/wiesbaden"
          },
          {
            "name": "Würzburg",
            "url": "https://www.lonelyplanet.com/destinations/germany/bavaria/wurzburg"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Greece",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/greece",
        "cities": [
          {
            "name": "Aegina",
            "url": "https://www.lonelyplanet.com/destinations/greece/aegina"
          },
          {
            "name": "Agios Nikolaos",
            "url": "https://www.lonelyplanet.com/destinations/greece/crete/agios-nikolaos"
          },
          {
            "name": "Alonnisos",
            "url": "https://www.lonelyplanet.com/destinations/greece/alonnisos"
          },
          {
            "name": "Argostoli",
            "url": "https://www.lonelyplanet.com/destinations/greece/argostoli"
          },
          {
            "name": "Athens",
            "url": "https://www.lonelyplanet.com/destinations/greece/athens"
          },
          {
            "name": "Central Greece",
            "url": "https://www.lonelyplanet.com/destinations/greece/central-greece"
          },
          {
            "name": "Chios",
            "url": "https://www.lonelyplanet.com/destinations/greece/northeastern-aegean-islands/chios"
          },
          {
            "name": "Corfu",
            "url": "https://www.lonelyplanet.com/destinations/greece/ionian-islands/corfu"
          },
          {
            "name": "Corfu Town",
            "url": "https://www.lonelyplanet.com/destinations/greece/corfu-town"
          },
          {
            "name": "Crete",
            "url": "https://www.lonelyplanet.com/destinations/greece/crete"
          },
          {
            "name": "Cyclades",
            "url": "https://www.lonelyplanet.com/destinations/greece/cyclades"
          },
          {
            "name": "Delphi",
            "url": "https://www.lonelyplanet.com/destinations/greece/delphi"
          },
          {
            "name": "Dodecanese",
            "url": "https://www.lonelyplanet.com/destinations/greece/dodecanese"
          },
          {
            "name": "Elounda",
            "url": "https://www.lonelyplanet.com/destinations/greece/crete/elounda"
          },
          {
            "name": "Epiros",
            "url": "https://www.lonelyplanet.com/destinations/greece/epiros"
          },
          {
            "name": "Evia",
            "url": "https://www.lonelyplanet.com/destinations/greece/evia"
          },
          {
            "name": "Fira",
            "url": "https://www.lonelyplanet.com/destinations/greece/fira"
          },
          {
            "name": "Greek Islands",
            "url": "https://www.lonelyplanet.com/destinations/greece/greek-islands"
          },
          {
            "name": "Hania",
            "url": "https://www.lonelyplanet.com/destinations/greece/crete/hania"
          },
          {
            "name": "Hora (Mykonos)",
            "url": "https://www.lonelyplanet.com/destinations/greece/hora-mykonos"
          },
          {
            "name": "Hora (Naxos)",
            "url": "https://www.lonelyplanet.com/destinations/greece/hora-naxos"
          },
          {
            "name": "Hydra",
            "url": "https://www.lonelyplanet.com/destinations/greece/saronic-gulf-islands/hydra"
          },
          {
            "name": "Ikaria",
            "url": "https://www.lonelyplanet.com/destinations/greece/ikaria"
          },
          {
            "name": "Ioannina",
            "url": "https://www.lonelyplanet.com/destinations/greece/northern-greece/ioannina"
          },
          {
            "name": "Ionian Islands",
            "url": "https://www.lonelyplanet.com/destinations/greece/ionian-islands"
          },
          {
            "name": "Iraklio",
            "url": "https://www.lonelyplanet.com/destinations/greece/crete/iraklio"
          },
          {
            "name": "Kalamata",
            "url": "https://www.lonelyplanet.com/destinations/greece/the-peloponnese/kalamata"
          },
          {
            "name": "Karpathos",
            "url": "https://www.lonelyplanet.com/destinations/greece/dodecanese/karpathos"
          },
          {
            "name": "Kefallonia",
            "url": "https://www.lonelyplanet.com/destinations/greece/ionian-islands/kefallonia"
          },
          {
            "name": "Kos",
            "url": "https://www.lonelyplanet.com/destinations/greece/dodecanese/kos"
          },
          {
            "name": "Kos Town",
            "url": "https://www.lonelyplanet.com/destinations/greece/kos-town"
          },
          {
            "name": "Kythira",
            "url": "https://www.lonelyplanet.com/destinations/greece/kythira"
          },
          {
            "name": "Lefkada",
            "url": "https://www.lonelyplanet.com/destinations/greece/ionian-islands/lefkada"
          },
          {
            "name": "Lesvos",
            "url": "https://www.lonelyplanet.com/destinations/greece/northeastern-aegean-islands/lesvos-mytilini"
          },
          {
            "name": "Lindos",
            "url": "https://www.lonelyplanet.com/destinations/greece/lindos"
          },
          {
            "name": "Macedonia",
            "url": "https://www.lonelyplanet.com/destinations/greece/macedonia"
          },
          {
            "name": "Messinia",
            "url": "https://www.lonelyplanet.com/destinations/greece/messinia"
          },
          {
            "name": "Meteora",
            "url": "https://www.lonelyplanet.com/destinations/greece/meteora"
          },
          {
            "name": "Monemvasia",
            "url": "https://www.lonelyplanet.com/destinations/greece/the-peloponnese/gefyra-and-monemvasia"
          },
          {
            "name": "Mykonos",
            "url": "https://www.lonelyplanet.com/destinations/greece/cyclades/mykonos"
          },
          {
            "name": "Nafplio",
            "url": "https://www.lonelyplanet.com/destinations/greece/the-peloponnese/nafplio"
          },
          {
            "name": "Northeastern Aegean Islands",
            "url": "https://www.lonelyplanet.com/destinations/greece/northeastern-aegean-islands"
          },
          {
            "name": "Northern Greece",
            "url": "https://www.lonelyplanet.com/destinations/greece/northern-greece"
          },
          {
            "name": "Oia",
            "url": "https://www.lonelyplanet.com/destinations/greece/oia"
          },
          {
            "name": "Parga",
            "url": "https://www.lonelyplanet.com/destinations/greece/parga"
          },
          {
            "name": "Pelion Peninsula",
            "url": "https://www.lonelyplanet.com/destinations/greece/pelion-peninsula"
          },
          {
            "name": "Peloponnese",
            "url": "https://www.lonelyplanet.com/destinations/greece/the-peloponnese"
          },
          {
            "name": "Piraeus",
            "url": "https://www.lonelyplanet.com/destinations/greece/athens/piraeus"
          },
          {
            "name": "Preveza",
            "url": "https://www.lonelyplanet.com/destinations/greece/northern-greece/preveza"
          },
          {
            "name": "Rethymno",
            "url": "https://www.lonelyplanet.com/destinations/greece/rethymno"
          },
          {
            "name": "Rhodes",
            "url": "https://www.lonelyplanet.com/destinations/greece/dodecanese/rhodes"
          },
          {
            "name": "Rhodes Town",
            "url": "https://www.lonelyplanet.com/destinations/greece/dodecanese/rhodes-town"
          },
          {
            "name": "Samaria Gorge",
            "url": "https://www.lonelyplanet.com/destinations/greece/crete/samaria-gorge"
          },
          {
            "name": "Samos",
            "url": "https://www.lonelyplanet.com/destinations/greece/northeastern-aegean-islands/samos"
          },
          {
            "name": "Santorini",
            "url": "https://www.lonelyplanet.com/destinations/greece/cyclades/santorini-thira"
          },
          {
            "name": "Saronic Gulf Islands",
            "url": "https://www.lonelyplanet.com/destinations/greece/saronic-gulf-islands"
          },
          {
            "name": "Serifos",
            "url": "https://www.lonelyplanet.com/destinations/greece/serifos"
          },
          {
            "name": "Skiathos",
            "url": "https://www.lonelyplanet.com/destinations/greece/sporades/skiathos"
          },
          {
            "name": "Skopelos",
            "url": "https://www.lonelyplanet.com/destinations/greece/skopelos"
          },
          {
            "name": "Thasos",
            "url": "https://www.lonelyplanet.com/destinations/greece/northeastern-aegean-islands/thasos"
          },
          {
            "name": "The Mani",
            "url": "https://www.lonelyplanet.com/destinations/greece/the-mani"
          },
          {
            "name": "Thessaloniki",
            "url": "https://www.lonelyplanet.com/destinations/greece/northern-greece/thessaloniki"
          },
          {
            "name": "Zagorohoria",
            "url": "https://www.lonelyplanet.com/destinations/greece/northern-greece/zagorohoria"
          },
          {
            "name": "Zakynthos",
            "url": "https://www.lonelyplanet.com/destinations/greece/zakynthos"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Guatemala",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/guatemala",
        "cities": [
          {
            "name": "Antigua",
            "url": "https://www.lonelyplanet.com/destinations/guatemala/antigua"
          },
          {
            "name": "Chichicastenango",
            "url": "https://www.lonelyplanet.com/destinations/guatemala/the-highlands-quiche/chichicastenango"
          },
          {
            "name": "El Petén",
            "url": "https://www.lonelyplanet.com/destinations/guatemala/el-peten"
          },
          {
            "name": "Guatemala City",
            "url": "https://www.lonelyplanet.com/destinations/guatemala/guatemala-city"
          },
          {
            "name": "Lago de Atitlán",
            "url": "https://www.lonelyplanet.com/destinations/guatemala/the-highlands-lago-de-atitlan"
          },
          {
            "name": "Panajachel",
            "url": "https://www.lonelyplanet.com/destinations/guatemala/the-highlands-lago-de-atitlan/panajachel"
          },
          {
            "name": "Quetzaltenango",
            "url": "https://www.lonelyplanet.com/destinations/guatemala/western-highlands/quetzaltenango-xela"
          },
          {
            "name": "San Marcos La Laguna",
            "url": "https://www.lonelyplanet.com/destinations/guatemala/the-highlands-lago-de-atitlan/san-marcos-la-laguna"
          },
          {
            "name": "San Pedro La Laguna",
            "url": "https://www.lonelyplanet.com/destinations/guatemala/the-highlands-lago-de-atitlan/san-pedro-la-laguna"
          },
          {
            "name": "Santa Cruz La Laguna",
            "url": "https://www.lonelyplanet.com/destinations/guatemala/the-highlands-lago-de-atitlan/santa-cruz-la-laguna"
          },
          {
            "name": "The Highlands",
            "url": "https://www.lonelyplanet.com/destinations/guatemala/the-highlands-quiche"
          },
          {
            "name": "Tikal",
            "url": "https://www.lonelyplanet.com/destinations/guatemala/tikal"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Honduras",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/honduras",
        "cities": [
          {
            "name": "Bay Islands",
            "url": "https://www.lonelyplanet.com/destinations/honduras/bay-islands"
          },
          {
            "name": "Roatán",
            "url": "https://www.lonelyplanet.com/destinations/honduras/bay-islands/roatan"
          },
          {
            "name": "Tegucigalpa",
            "url": "https://www.lonelyplanet.com/destinations/honduras/tegucigalpa"
          },
          {
            "name": "Utila",
            "url": "https://www.lonelyplanet.com/destinations/honduras/bay-islands/utila"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Hungary",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/hungary",
        "cities": [
          {
            "name": "Budapest",
            "url": "https://www.lonelyplanet.com/destinations/hungary/budapest"
          },
          {
            "name": "Eger",
            "url": "https://www.lonelyplanet.com/destinations/hungary/northeastern-hungary/eger"
          },
          {
            "name": "Esztergom",
            "url": "https://www.lonelyplanet.com/destinations/hungary/the-danube-bend/esztergom"
          },
          {
            "name": "Lake Balaton & Southern Transdanubia",
            "url": "https://www.lonelyplanet.com/destinations/hungary/lake-balaton-southern-transdanubia"
          },
          {
            "name": "Pécs",
            "url": "https://www.lonelyplanet.com/destinations/hungary/south-central-hungary/pecs"
          },
          {
            "name": "Szentendre",
            "url": "https://www.lonelyplanet.com/destinations/hungary/the-danube-bend/szentendre"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Iceland",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/iceland",
        "cities": [
          {
            "name": "Akureyri",
            "url": "https://www.lonelyplanet.com/destinations/iceland/the-north/akureyri"
          },
          {
            "name": "Heimaey",
            "url": "https://www.lonelyplanet.com/destinations/iceland/heimaey"
          },
          {
            "name": "Ísafjörður",
            "url": "https://www.lonelyplanet.com/destinations/iceland/isafjordur"
          },
          {
            "name": "North Iceland",
            "url": "https://www.lonelyplanet.com/destinations/iceland/the-north"
          },
          {
            "name": "Reykjanesfólkvangur Reserve",
            "url": "https://www.lonelyplanet.com/destinations/iceland/reykjanesfolkvangur-reserve"
          },
          {
            "name": "Reykjavík",
            "url": "https://www.lonelyplanet.com/destinations/iceland/reykjavik"
          },
          {
            "name": "Seyðisfjörður",
            "url": "https://www.lonelyplanet.com/destinations/iceland/the-east/seydisfjordur"
          },
          {
            "name": "Snæfellsjökull National Park",
            "url": "https://www.lonelyplanet.com/destinations/iceland/snaefellsjokull-national-park"
          },
          {
            "name": "Snæfellsnes Peninsula",
            "url": "https://www.lonelyplanet.com/destinations/iceland/the-west/snaefellsnes"
          },
          {
            "name": "Southeast Iceland",
            "url": "https://www.lonelyplanet.com/destinations/iceland/southeast-iceland"
          },
          {
            "name": "Southwest Iceland",
            "url": "https://www.lonelyplanet.com/destinations/iceland/southwest-iceland"
          },
          {
            "name": "The Golden Circle",
            "url": "https://www.lonelyplanet.com/destinations/iceland/reykjavik/the-golden-circle"
          },
          {
            "name": "The Westfjords",
            "url": "https://www.lonelyplanet.com/destinations/iceland/the-westfjords"
          },
          {
            "name": "West Iceland",
            "url": "https://www.lonelyplanet.com/destinations/iceland/the-west"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Ireland",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/ireland",
        "cities": [
          {
            "name": "Aran Islands",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-galway/aran-islands"
          },
          {
            "name": "Beara Peninsula",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-cork/beara-peninsula-ring-of-beara"
          },
          {
            "name": "Cliffs of Moher",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-clare/cliffs-of-moher"
          },
          {
            "name": "Connemara",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-galway/connemara"
          },
          {
            "name": "Cork City",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-cork/cork-city"
          },
          {
            "name": "Counties Mayo & Sligo",
            "url": "https://www.lonelyplanet.com/destinations/ireland/counties-mayo-sligo"
          },
          {
            "name": "County Clare",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-clare"
          },
          {
            "name": "County Cork",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-cork"
          },
          {
            "name": "County Donegal",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-donegal"
          },
          {
            "name": "County Dublin",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-dublin-1341906"
          },
          {
            "name": "County Galway",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-galway"
          },
          {
            "name": "County Kerry",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-kerry"
          },
          {
            "name": "County Mayo",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-mayo"
          },
          {
            "name": "County Meath",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-meath"
          },
          {
            "name": "County Wicklow",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-wicklow"
          },
          {
            "name": "Dingle Peninsula",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-kerry/dingle-peninsula"
          },
          {
            "name": "Dublin",
            "url": "https://www.lonelyplanet.com/destinations/ireland/dublin"
          },
          {
            "name": "Galway City",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-galway/galway-city"
          },
          {
            "name": "Glendalough",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-wicklow/glendalough"
          },
          {
            "name": "Inishowen Peninsula",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-donegal/inishowen-peninsula"
          },
          {
            "name": "Kilkenny City",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-kilkenny/kilkenny-city"
          },
          {
            "name": "Killarney National Park",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-kerry/killarney-national-park"
          },
          {
            "name": "Kinsale",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-cork/kinsale"
          },
          {
            "name": "Limerick City",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-limerick/limerick-city"
          },
          {
            "name": "Ring of Kerry",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-kerry/ring-of-kerry"
          },
          {
            "name": "Skellig Ring",
            "url": "https://www.lonelyplanet.com/destinations/ireland/skellig-ring"
          },
          {
            "name": "The Burren",
            "url": "https://www.lonelyplanet.com/destinations/ireland/county-clare/the-burren"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Italy",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/italy",
        "cities": [
          {
            "name": "Abruzzo",
            "url": "https://www.lonelyplanet.com/destinations/italy/abruzzo-and-molise/abruzzo"
          },
          {
            "name": "Agrigento",
            "url": "https://www.lonelyplanet.com/destinations/italy/sicily/agrigento"
          },
          {
            "name": "Agropoli",
            "url": "https://www.lonelyplanet.com/destinations/italy/agropoli"
          },
          {
            "name": "Alba",
            "url": "https://www.lonelyplanet.com/destinations/italy/liguria-piedmont-and-valle-daosta/alba"
          },
          {
            "name": "Alberobello",
            "url": "https://www.lonelyplanet.com/destinations/italy/puglia/alberobello"
          },
          {
            "name": "Alghero",
            "url": "https://www.lonelyplanet.com/destinations/italy/sardinia/alghero"
          },
          {
            "name": "Amalfi",
            "url": "https://www.lonelyplanet.com/destinations/italy/campania/amalfi"
          },
          {
            "name": "Ancona",
            "url": "https://www.lonelyplanet.com/destinations/italy/umbria-and-le-marche/ancona"
          },
          {
            "name": "Aosta",
            "url": "https://www.lonelyplanet.com/destinations/italy/liguria-piedmont-and-valle-daosta/aosta"
          },
          {
            "name": "Arezzo",
            "url": "https://www.lonelyplanet.com/destinations/italy/tuscany/arezzo"
          },
          {
            "name": "Assisi",
            "url": "https://www.lonelyplanet.com/destinations/italy/umbria-and-le-marche/assisi"
          },
          {
            "name": "Bari",
            "url": "https://www.lonelyplanet.com/destinations/italy/puglia/bari"
          },
          {
            "name": "Basilicata",
            "url": "https://www.lonelyplanet.com/destinations/italy/basilicata"
          },
          {
            "name": "Bay of Naples",
            "url": "https://www.lonelyplanet.com/destinations/italy/campania/bay-of-naples"
          },
          {
            "name": "Bellagio",
            "url": "https://www.lonelyplanet.com/destinations/italy/the-italian-lakes/bellagio"
          },
          {
            "name": "Belluno",
            "url": "https://www.lonelyplanet.com/destinations/italy/the-veneto/belluno"
          },
          {
            "name": "Bergamo",
            "url": "https://www.lonelyplanet.com/destinations/italy/lombardy-and-the-lakes/bergamo"
          },
          {
            "name": "Bologna",
            "url": "https://www.lonelyplanet.com/destinations/italy/emilia-romagna-and-san-marino/bologna"
          },
          {
            "name": "Bolzano (Bozen)",
            "url": "https://www.lonelyplanet.com/destinations/italy/trentino-alto-adige/bolzano"
          },
          {
            "name": "Bosa",
            "url": "https://www.lonelyplanet.com/destinations/italy/sardinia/bosa"
          },
          {
            "name": "Brescia",
            "url": "https://www.lonelyplanet.com/destinations/italy/lombardy-and-the-lakes/brescia"
          },
          {
            "name": "Brindisi",
            "url": "https://www.lonelyplanet.com/destinations/italy/puglia/brindisi"
          },
          {
            "name": "Cagliari",
            "url": "https://www.lonelyplanet.com/destinations/italy/sardinia/cagliari"
          },
          {
            "name": "Calabria",
            "url": "https://www.lonelyplanet.com/destinations/italy/calabria"
          },
          {
            "name": "Cala Gonone",
            "url": "https://www.lonelyplanet.com/destinations/italy/sardinia/cala-gonone-and-around"
          },
          {
            "name": "Campania",
            "url": "https://www.lonelyplanet.com/destinations/italy/campania"
          },
          {
            "name": "Capri",
            "url": "https://www.lonelyplanet.com/destinations/italy/campania/capri"
          },
          {
            "name": "Castelli Romani",
            "url": "https://www.lonelyplanet.com/destinations/italy/lazio/castelli-romani"
          },
          {
            "name": "Catania",
            "url": "https://www.lonelyplanet.com/destinations/italy/sicily/catania"
          },
          {
            "name": "Cefalù",
            "url": "https://www.lonelyplanet.com/destinations/italy/sicily/cefalu"
          },
          {
            "name": "Cilento Coast",
            "url": "https://www.lonelyplanet.com/destinations/italy/cilento-coast"
          },
          {
            "name": "Cinque Terre",
            "url": "https://www.lonelyplanet.com/destinations/italy/cinque-terre"
          },
          {
            "name": "Cisternino",
            "url": "https://www.lonelyplanet.com/destinations/italy/puglia/cisternino"
          },
          {
            "name": "Como",
            "url": "https://www.lonelyplanet.com/destinations/italy/the-italian-lakes/como"
          },
          {
            "name": "Corniglia",
            "url": "https://www.lonelyplanet.com/destinations/italy/corniglia"
          },
          {
            "name": "Cortina d’Ampezzo",
            "url": "https://www.lonelyplanet.com/destinations/italy/trentino-alto-adige/cortina-dampezzo"
          },
          {
            "name": "Cremona",
            "url": "https://www.lonelyplanet.com/destinations/italy/lombardy-and-the-lakes/cremona"
          },
          {
            "name": "Emilia-Romagna",
            "url": "https://www.lonelyplanet.com/destinations/italy/emilia-romagna-and-san-marino"
          },
          {
            "name": "Enna",
            "url": "https://www.lonelyplanet.com/destinations/italy/sicily/enna"
          },
          {
            "name": "Erice",
            "url": "https://www.lonelyplanet.com/destinations/italy/sicily/erice"
          },
          {
            "name": "Ferrara",
            "url": "https://www.lonelyplanet.com/destinations/italy/emilia-romagna-and-san-marino/ferrara"
          },
          {
            "name": "Fiesole",
            "url": "https://www.lonelyplanet.com/destinations/italy/tuscany/fiesole"
          },
          {
            "name": "Florence",
            "url": "https://www.lonelyplanet.com/destinations/italy/florence"
          },
          {
            "name": "Friuli Venezia Giulia",
            "url": "https://www.lonelyplanet.com/destinations/italy/friuli-venezia-giulia"
          },
          {
            "name": "Gallipoli",
            "url": "https://www.lonelyplanet.com/destinations/italy/puglia/gallipoli"
          },
          {
            "name": "Genoa",
            "url": "https://www.lonelyplanet.com/destinations/italy/liguria-piedmont-and-valle-daosta/genoa"
          },
          {
            "name": "Giardini-Naxos",
            "url": "https://www.lonelyplanet.com/destinations/italy/sicily/giardini-naxos"
          },
          {
            "name": "Grado",
            "url": "https://www.lonelyplanet.com/destinations/italy/friuli-venezia-giulia/grado"
          },
          {
            "name": "Ischia",
            "url": "https://www.lonelyplanet.com/destinations/italy/campania/ischia"
          },
          {
            "name": "Lago Trasimeno",
            "url": "https://www.lonelyplanet.com/destinations/italy/umbria-and-le-marche/lago-trasimeno"
          },
          {
            "name": "Lake Como",
            "url": "https://www.lonelyplanet.com/destinations/italy/lombardy-and-the-lakes/lago-di-como"
          },
          {
            "name": "Lake Como & Around",
            "url": "https://www.lonelyplanet.com/destinations/italy/the-italian-lakes/lake-como-around"
          },
          {
            "name": "Lake Garda",
            "url": "https://www.lonelyplanet.com/destinations/italy/lombardy-and-the-lakes/lago-di-garda"
          },
          {
            "name": "Lake Garda & Around",
            "url": "https://www.lonelyplanet.com/destinations/italy/the-italian-lakes/lake-garda-around"
          },
          {
            "name": "Lake Iseo",
            "url": "https://www.lonelyplanet.com/destinations/italy/lombardy-and-the-lakes/lago-diseo"
          },
          {
            "name": "Lake Maggiore",
            "url": "https://www.lonelyplanet.com/destinations/italy/lombardy-and-the-lakes/lago-maggiore"
          },
          {
            "name": "Lake Orta",
            "url": "https://www.lonelyplanet.com/destinations/italy/lombardy-and-the-lakes/lago-dorta"
          },
          {
            "name": "Langhe, Roero & Monferrato",
            "url": "https://www.lonelyplanet.com/destinations/italy/langhe-roero-monferrato"
          },
          {
            "name": "La Spezia",
            "url": "https://www.lonelyplanet.com/destinations/italy/liguria-piedmont-and-valle-daosta/la-spezia"
          },
          {
            "name": "Lazio",
            "url": "https://www.lonelyplanet.com/destinations/italy/lazio"
          },
          {
            "name": "Lecce",
            "url": "https://www.lonelyplanet.com/destinations/italy/puglia/lecce"
          },
          {
            "name": "Le Marche",
            "url": "https://www.lonelyplanet.com/destinations/italy/umbria-and-le-marche/le-marche"
          },
          {
            "name": "Livorno",
            "url": "https://www.lonelyplanet.com/destinations/italy/tuscany/livorno"
          },
          {
            "name": "Lucca",
            "url": "https://www.lonelyplanet.com/destinations/italy/tuscany/lucca"
          },
          {
            "name": "Manarola",
            "url": "https://www.lonelyplanet.com/destinations/italy/manarola"
          },
          {
            "name": "Mantua",
            "url": "https://www.lonelyplanet.com/destinations/italy/lombardy-and-the-lakes/mantua"
          },
          {
            "name": "Marsala",
            "url": "https://www.lonelyplanet.com/destinations/italy/sicily/marsala"
          },
          {
            "name": "Massa Lubrense",
            "url": "https://www.lonelyplanet.com/destinations/italy/massa-lubrense"
          },
          {
            "name": "Matera",
            "url": "https://www.lonelyplanet.com/destinations/italy/basilicata/matera"
          },
          {
            "name": "Merano (Meran)",
            "url": "https://www.lonelyplanet.com/destinations/italy/trentino-alto-adige/merano"
          },
          {
            "name": "Messina",
            "url": "https://www.lonelyplanet.com/destinations/italy/sicily/messina"
          },
          {
            "name": "Milan",
            "url": "https://www.lonelyplanet.com/destinations/italy/milan"
          },
          {
            "name": "Milazzo",
            "url": "https://www.lonelyplanet.com/destinations/italy/sicily/milazzo"
          },
          {
            "name": "Minori",
            "url": "https://www.lonelyplanet.com/destinations/italy/minori"
          },
          {
            "name": "Modena",
            "url": "https://www.lonelyplanet.com/destinations/italy/emilia-romagna-and-san-marino/modena"
          },
          {
            "name": "Modica",
            "url": "https://www.lonelyplanet.com/destinations/italy/sicily/modica"
          },
          {
            "name": "Molise",
            "url": "https://www.lonelyplanet.com/destinations/italy/abruzzo-and-molise/molise"
          },
          {
            "name": "Montalcino",
            "url": "https://www.lonelyplanet.com/destinations/italy/tuscany/montalcino"
          },
          {
            "name": "Montepulciano",
            "url": "https://www.lonelyplanet.com/destinations/italy/tuscany/montepulciano"
          },
          {
            "name": "Monterosso",
            "url": "https://www.lonelyplanet.com/destinations/italy/monterosso"
          },
          {
            "name": "Naples",
            "url": "https://www.lonelyplanet.com/destinations/italy/campania/naples"
          },
          {
            "name": "Northwestern Italy",
            "url": "https://www.lonelyplanet.com/destinations/italy/northwestern-italy"
          },
          {
            "name": "Noto",
            "url": "https://www.lonelyplanet.com/destinations/italy/sicily/noto"
          },
          {
            "name": "Olbia",
            "url": "https://www.lonelyplanet.com/destinations/italy/sardinia/olbia"
          },
          {
            "name": "Oristano",
            "url": "https://www.lonelyplanet.com/destinations/italy/sardinia/oristano"
          },
          {
            "name": "Orvieto",
            "url": "https://www.lonelyplanet.com/destinations/italy/umbria-and-le-marche/orvieto"
          },
          {
            "name": "Ostuni",
            "url": "https://www.lonelyplanet.com/destinations/italy/puglia/ostuni"
          },
          {
            "name": "Otranto",
            "url": "https://www.lonelyplanet.com/destinations/italy/puglia/otranto"
          },
          {
            "name": "Padua",
            "url": "https://www.lonelyplanet.com/destinations/italy/the-veneto/padua"
          },
          {
            "name": "Paestum",
            "url": "https://www.lonelyplanet.com/destinations/italy/campania/paestum"
          },
          {
            "name": "Palau",
            "url": "https://www.lonelyplanet.com/destinations/italy/sardinia/palau"
          },
          {
            "name": "Palermo",
            "url": "https://www.lonelyplanet.com/destinations/italy/sicily/palermo"
          },
          {
            "name": "Parma",
            "url": "https://www.lonelyplanet.com/destinations/italy/emilia-romagna-and-san-marino/parma"
          },
          {
            "name": "Pavia",
            "url": "https://www.lonelyplanet.com/destinations/italy/lombardy-and-the-lakes/pavia"
          },
          {
            "name": "Perugia",
            "url": "https://www.lonelyplanet.com/destinations/italy/umbria-and-le-marche/perugia"
          },
          {
            "name": "Pescara",
            "url": "https://www.lonelyplanet.com/destinations/italy/abruzzo-and-molise/pescara"
          },
          {
            "name": "Peschici",
            "url": "https://www.lonelyplanet.com/destinations/italy/puglia/peschici"
          },
          {
            "name": "Piacenza",
            "url": "https://www.lonelyplanet.com/destinations/italy/emilia-romagna-and-san-marino/piacenza"
          },
          {
            "name": "Piedmont",
            "url": "https://www.lonelyplanet.com/destinations/italy/liguria-piedmont-and-valle-daosta/piedmont"
          },
          {
            "name": "Pistoia",
            "url": "https://www.lonelyplanet.com/destinations/italy/tuscany/pistoia"
          },
          {
            "name": "Polignano a Mare",
            "url": "https://www.lonelyplanet.com/destinations/italy/puglia/polignano-a-mare"
          },
          {
            "name": "Pompeii",
            "url": "https://www.lonelyplanet.com/destinations/italy/campania/pompeii"
          },
          {
            "name": "Porto Cervo",
            "url": "https://www.lonelyplanet.com/destinations/italy/sardinia/porto-cervo"
          },
          {
            "name": "Portofino",
            "url": "https://www.lonelyplanet.com/destinations/italy/liguria-piedmont-and-valle-daosta/portofino"
          },
          {
            "name": "Porto Venere",
            "url": "https://www.lonelyplanet.com/destinations/italy/liguria-piedmont-and-valle-daosta/porto-venere"
          },
          {
            "name": "Positano",
            "url": "https://www.lonelyplanet.com/destinations/italy/campania/positano"
          },
          {
            "name": "Praiano",
            "url": "https://www.lonelyplanet.com/destinations/italy/praiano"
          },
          {
            "name": "Procida",
            "url": "https://www.lonelyplanet.com/destinations/italy/campania/procida"
          },
          {
            "name": "Puglia",
            "url": "https://www.lonelyplanet.com/destinations/italy/puglia"
          },
          {
            "name": "Ragusa",
            "url": "https://www.lonelyplanet.com/destinations/italy/sicily/ragusa"
          },
          {
            "name": "Ravello",
            "url": "https://www.lonelyplanet.com/destinations/italy/campania/ravello"
          },
          {
            "name": "Ravenna",
            "url": "https://www.lonelyplanet.com/destinations/italy/emilia-romagna-and-san-marino/ravenna"
          },
          {
            "name": "Reggio Calabria",
            "url": "https://www.lonelyplanet.com/destinations/italy/calabria/reggio-di-calabria"
          },
          {
            "name": "Reggio Emilia",
            "url": "https://www.lonelyplanet.com/destinations/italy/emilia-romagna-and-san-marino/reggio-emilia"
          },
          {
            "name": "Rimini",
            "url": "https://www.lonelyplanet.com/destinations/italy/emilia-romagna-and-san-marino/rimini"
          },
          {
            "name": "Riomaggiore",
            "url": "https://www.lonelyplanet.com/destinations/italy/riomaggiore"
          },
          {
            "name": "Rome",
            "url": "https://www.lonelyplanet.com/destinations/italy/rome"
          },
          {
            "name": "Salerno",
            "url": "https://www.lonelyplanet.com/destinations/italy/campania/salerno"
          },
          {
            "name": "San Gimignano",
            "url": "https://www.lonelyplanet.com/destinations/italy/tuscany/san-gimignano"
          },
          {
            "name": "San Remo",
            "url": "https://www.lonelyplanet.com/destinations/italy/liguria-piedmont-and-valle-daosta/san-remo"
          },
          {
            "name": "Sant’Agata sui Due Golfi",
            "url": "https://www.lonelyplanet.com/destinations/italy/sant-agata-sui-due-golfi"
          },
          {
            "name": "Santa Margherita Ligure",
            "url": "https://www.lonelyplanet.com/destinations/italy/liguria-piedmont-and-valle-daosta/santa-margherita"
          },
          {
            "name": "San Teodoro",
            "url": "https://www.lonelyplanet.com/destinations/italy/sardinia/san-teodoro"
          },
          {
            "name": "Sardinia",
            "url": "https://www.lonelyplanet.com/destinations/italy/sardinia"
          },
          {
            "name": "Sassari",
            "url": "https://www.lonelyplanet.com/destinations/italy/sardinia/sassari"
          },
          {
            "name": "Savona",
            "url": "https://www.lonelyplanet.com/destinations/italy/liguria-piedmont-and-valle-daosta/savona"
          },
          {
            "name": "Sicily",
            "url": "https://www.lonelyplanet.com/destinations/italy/sicily"
          },
          {
            "name": "Siena",
            "url": "https://www.lonelyplanet.com/destinations/italy/tuscany/siena"
          },
          {
            "name": "Sirmione",
            "url": "https://www.lonelyplanet.com/destinations/italy/the-italian-lakes/sirmione"
          },
          {
            "name": "Sorrento",
            "url": "https://www.lonelyplanet.com/destinations/italy/campania/sorrento"
          },
          {
            "name": "Sorrento Peninsula",
            "url": "https://www.lonelyplanet.com/destinations/italy/sorrento-peninsula"
          },
          {
            "name": "Southern Italy",
            "url": "https://www.lonelyplanet.com/destinations/italy/southern-italy"
          },
          {
            "name": "Spoleto",
            "url": "https://www.lonelyplanet.com/destinations/italy/umbria-and-le-marche/spoleto"
          },
          {
            "name": "Stresa",
            "url": "https://www.lonelyplanet.com/destinations/italy/the-italian-lakes/stresa"
          },
          {
            "name": "Syracuse",
            "url": "https://www.lonelyplanet.com/destinations/italy/sicily/syracuse"
          },
          {
            "name": "Taormina",
            "url": "https://www.lonelyplanet.com/destinations/italy/sicily/taormina"
          },
          {
            "name": "Taranto",
            "url": "https://www.lonelyplanet.com/destinations/italy/puglia/taranto"
          },
          {
            "name": "The Amalfi Coast",
            "url": "https://www.lonelyplanet.com/destinations/italy/amalfi-coast"
          },
          {
            "name": "The Dolomites",
            "url": "https://www.lonelyplanet.com/destinations/italy/trentino-south-tyrol/the-dolomites"
          },
          {
            "name": "The Italian Lakes",
            "url": "https://www.lonelyplanet.com/destinations/italy/lombardy-and-the-lakes"
          },
          {
            "name": "The Italian Riviera",
            "url": "https://www.lonelyplanet.com/destinations/italy/liguria-piedmont-and-valle-daosta"
          },
          {
            "name": "The Veneto",
            "url": "https://www.lonelyplanet.com/destinations/italy/the-veneto"
          },
          {
            "name": "Tivoli",
            "url": "https://www.lonelyplanet.com/destinations/italy/lazio/tivoli"
          },
          {
            "name": "Todi",
            "url": "https://www.lonelyplanet.com/destinations/italy/umbria-and-le-marche/todi"
          },
          {
            "name": "Trani",
            "url": "https://www.lonelyplanet.com/destinations/italy/puglia/trani"
          },
          {
            "name": "Trapani",
            "url": "https://www.lonelyplanet.com/destinations/italy/sicily/trapani"
          },
          {
            "name": "Trentino & South Tyrol",
            "url": "https://www.lonelyplanet.com/destinations/italy/trentino-alto-adige"
          },
          {
            "name": "Trento",
            "url": "https://www.lonelyplanet.com/destinations/italy/trentino-alto-adige/trento"
          },
          {
            "name": "Treviso",
            "url": "https://www.lonelyplanet.com/destinations/italy/the-veneto/treviso"
          },
          {
            "name": "Trieste",
            "url": "https://www.lonelyplanet.com/destinations/italy/friuli-venezia-giulia/trieste"
          },
          {
            "name": "Tropea",
            "url": "https://www.lonelyplanet.com/destinations/italy/tropea"
          },
          {
            "name": "Turin",
            "url": "https://www.lonelyplanet.com/destinations/italy/liguria-piedmont-and-valle-daosta/turin"
          },
          {
            "name": "Tuscany",
            "url": "https://www.lonelyplanet.com/destinations/italy/tuscany"
          },
          {
            "name": "Udine",
            "url": "https://www.lonelyplanet.com/destinations/italy/friuli-venezia-giulia/udine"
          },
          {
            "name": "Umbria",
            "url": "https://www.lonelyplanet.com/destinations/italy/umbria"
          },
          {
            "name": "Umbria & Le Marche",
            "url": "https://www.lonelyplanet.com/destinations/italy/umbria-and-le-marche"
          },
          {
            "name": "Valle d'Aosta",
            "url": "https://www.lonelyplanet.com/destinations/italy/liguria-piedmont-and-valle-daosta/valle-daosta"
          },
          {
            "name": "Veneto Dolomites",
            "url": "https://www.lonelyplanet.com/destinations/italy/veneto-dolomites"
          },
          {
            "name": "Venice",
            "url": "https://www.lonelyplanet.com/destinations/italy/venice"
          },
          {
            "name": "Ventimiglia",
            "url": "https://www.lonelyplanet.com/destinations/italy/ventimiglia"
          },
          {
            "name": "Vernazza",
            "url": "https://www.lonelyplanet.com/destinations/italy/vernazza"
          },
          {
            "name": "Verona",
            "url": "https://www.lonelyplanet.com/destinations/italy/the-veneto/verona"
          },
          {
            "name": "Vicenza",
            "url": "https://www.lonelyplanet.com/destinations/italy/the-veneto/vicenza"
          },
          {
            "name": "Vico Equense",
            "url": "https://www.lonelyplanet.com/destinations/italy/vico-equense"
          },
          {
            "name": "Vieste",
            "url": "https://www.lonelyplanet.com/destinations/italy/puglia/vieste"
          },
          {
            "name": "Vietri sul Mare",
            "url": "https://www.lonelyplanet.com/destinations/italy/vietri-sul-mare"
          },
          {
            "name": "Viterbo",
            "url": "https://www.lonelyplanet.com/destinations/italy/lazio/viterbo"
          },
          {
            "name": "Volterra",
            "url": "https://www.lonelyplanet.com/destinations/italy/tuscany/volterra"
          },
          {
            "name": "Pisa",
            "url": "https://www.lonelyplanet.com/destinations/italy/tuscany/pisa"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Kosovo",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/kosovo",
        "cities": [
          {
            "name": "Pristina",
            "url": "https://www.lonelyplanet.com/destinations/kosovo/prishtina"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Latvia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/latvia",
        "cities": [
          {
            "name": "Rīga",
            "url": "https://www.lonelyplanet.com/destinations/latvia/riga"
          },
          {
            "name": "Southern Latvia",
            "url": "https://www.lonelyplanet.com/destinations/latvia/eastern-latvia"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Liechtenstein",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/liechtenstein",
        "cities": [
          {
            "name": "Vaduz",
            "url": "https://www.lonelyplanet.com/destinations/liechtenstein/vaduz"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Lithuania",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/lithuania",
        "cities": [
          {
            "name": "Kaunas",
            "url": "https://www.lonelyplanet.com/destinations/lithuania/central-lithuania/kaunas"
          },
          {
            "name": "Vilnius",
            "url": "https://www.lonelyplanet.com/destinations/lithuania/vilnius"
          },
          {
            "name": "Ålesund",
            "url": "https://www.lonelyplanet.com/destinations/norway/bergen-and-the-western-fjords/alesund"
          },
          {
            "name": "Bergen",
            "url": "https://www.lonelyplanet.com/destinations/norway/bergen-and-the-western-fjords/bergen"
          },
          {
            "name": "Bergen & the Southwestern Fjords",
            "url": "https://www.lonelyplanet.com/destinations/norway/bergen-and-the-western-fjords"
          },
          {
            "name": "Central Norway",
            "url": "https://www.lonelyplanet.com/destinations/norway/central-norway"
          },
          {
            "name": "Lofoten",
            "url": "https://www.lonelyplanet.com/destinations/norway/northern-norway/lofoten"
          },
          {
            "name": "Longyearbyen",
            "url": "https://www.lonelyplanet.com/destinations/norway/svalbard/longyearbyen"
          },
          {
            "name": "Narvik",
            "url": "https://www.lonelyplanet.com/destinations/norway/northern-norway/narvik"
          },
          {
            "name": "Nordland",
            "url": "https://www.lonelyplanet.com/destinations/norway/nordland"
          },
          {
            "name": "Oslo",
            "url": "https://www.lonelyplanet.com/destinations/norway/oslo"
          },
          {
            "name": "Southern Norway",
            "url": "https://www.lonelyplanet.com/destinations/norway/southern-norway"
          },
          {
            "name": "Stavanger",
            "url": "https://www.lonelyplanet.com/destinations/norway/bergen-and-the-western-fjords/stavanger"
          },
          {
            "name": "Svalbard",
            "url": "https://www.lonelyplanet.com/destinations/norway/svalbard"
          },
          {
            "name": "The Northern Fjords",
            "url": "https://www.lonelyplanet.com/destinations/norway/the-northern-fjords"
          },
          {
            "name": "The Western Fjords",
            "url": "https://www.lonelyplanet.com/destinations/norway/the-western-fjords"
          },
          {
            "name": "Tromsø",
            "url": "https://www.lonelyplanet.com/destinations/norway/northern-norway/tromso"
          },
          {
            "name": "Trondheim",
            "url": "https://www.lonelyplanet.com/destinations/norway/northern-norway/trondheim"
          },
          {
            "name": "Western Finnmark",
            "url": "https://www.lonelyplanet.com/destinations/norway/finnmark"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Luxembourg",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/luxembourg",
        "cities": [
          {
            "name": "Luxembourg City",
            "url": "https://www.lonelyplanet.com/destinations/luxembourg/luxembourg-city"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Malta",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/malta",
        "cities": [
          {
            "name": "Gozo",
            "url": "https://www.lonelyplanet.com/destinations/malta/gozo"
          },
          {
            "name": "Gozo & Comino",
            "url": "https://www.lonelyplanet.com/destinations/malta/gozo-comino"
          },
          {
            "name": "Mdina",
            "url": "https://www.lonelyplanet.com/destinations/malta/mdina"
          },
          {
            "name": "Northern Malta",
            "url": "https://www.lonelyplanet.com/destinations/malta/northern-malta"
          },
          {
            "name": "Sliema, St Julian’s & Paceville",
            "url": "https://www.lonelyplanet.com/destinations/malta/sliema-st-julians-and-paceville"
          },
          {
            "name": "Southern Malta",
            "url": "https://www.lonelyplanet.com/destinations/malta/southern-malta"
          },
          {
            "name": "Valletta",
            "url": "https://www.lonelyplanet.com/destinations/malta/valletta"
          },
          {
            "name": "Vittoriosa",
            "url": "https://www.lonelyplanet.com/destinations/malta/vittoriosa"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Moldova",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/moldova",
        "cities": [
          {
            "name": "Chişinău",
            "url": "https://www.lonelyplanet.com/destinations/moldova/chisinau"
          },
          {
            "name": "Learn more about North Macedonia",
            "url": "https://www.lonelyplanet.com/destinations/macedonia"
          },
          {
            "name": "Lake Ohrid",
            "url": "https://www.lonelyplanet.com/destinations/north-macedonia/lake-ohrid"
          },
          {
            "name": "Mavrovo National Park",
            "url": "https://www.lonelyplanet.com/destinations/macedonia/western-macedonia/mavrovo-national-park"
          },
          {
            "name": "Ohrid",
            "url": "https://www.lonelyplanet.com/destinations/macedonia/southern-macedonia/ohrid"
          },
          {
            "name": "Skopje",
            "url": "https://www.lonelyplanet.com/destinations/macedonia/skopje"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Montenegro",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/montenegro",
        "cities": [
          {
            "name": "Adriatic Coast",
            "url": "https://www.lonelyplanet.com/destinations/montenegro/coastal-montenegro"
          },
          {
            "name": "Bay of Kotor",
            "url": "https://www.lonelyplanet.com/destinations/montenegro/bay-of-kotor"
          },
          {
            "name": "Biogradska Gora National Park",
            "url": "https://www.lonelyplanet.com/destinations/montenegro/biogradska-gora-national-park"
          },
          {
            "name": "Budva",
            "url": "https://www.lonelyplanet.com/destinations/montenegro/coastal-montenegro/budva"
          },
          {
            "name": "Durmitor National Park",
            "url": "https://www.lonelyplanet.com/destinations/montenegro/northern-montenegro/durmitor-national-park"
          },
          {
            "name": "Herceg Novi",
            "url": "https://www.lonelyplanet.com/destinations/montenegro/coastal-montenegro/herceg-novi"
          },
          {
            "name": "Kotor",
            "url": "https://www.lonelyplanet.com/destinations/montenegro/coastal-montenegro/kotor"
          },
          {
            "name": "Lake Skadar National Park",
            "url": "https://www.lonelyplanet.com/destinations/montenegro/lake-skadar-national-park"
          },
          {
            "name": "Perast",
            "url": "https://www.lonelyplanet.com/destinations/montenegro/perast"
          },
          {
            "name": "Petrovac",
            "url": "https://www.lonelyplanet.com/destinations/montenegro/petrovac"
          },
          {
            "name": "Podgorica",
            "url": "https://www.lonelyplanet.com/destinations/montenegro/podgorica"
          },
          {
            "name": "Sveti Stefan",
            "url": "https://www.lonelyplanet.com/destinations/montenegro/sveti-stefan"
          },
          {
            "name": "Tivat",
            "url": "https://www.lonelyplanet.com/destinations/montenegro/tivat"
          },
          {
            "name": "Ulcinj",
            "url": "https://www.lonelyplanet.com/destinations/montenegro/coastal-montenegro/ulcinj"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Nicaragua",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/nicaragua",
        "cities": [
          {
            "name": "Caribbean Coast",
            "url": "https://www.lonelyplanet.com/destinations/nicaragua/caribbean-coast"
          },
          {
            "name": "Corn Islands",
            "url": "https://www.lonelyplanet.com/destinations/nicaragua/caribbean-coast/corn-islands"
          },
          {
            "name": "Granada",
            "url": "https://www.lonelyplanet.com/destinations/nicaragua/granada-and-the-masaya-region/granada"
          },
          {
            "name": "Isla de Ometepe",
            "url": "https://www.lonelyplanet.com/destinations/nicaragua/isla-de-ometepe"
          },
          {
            "name": "León",
            "url": "https://www.lonelyplanet.com/destinations/nicaragua/leon-and-northwestern-nicaragua/leon"
          },
          {
            "name": "Little Corn Island",
            "url": "https://www.lonelyplanet.com/destinations/nicaragua/little-corn-island"
          },
          {
            "name": "Managua",
            "url": "https://www.lonelyplanet.com/destinations/nicaragua/managua"
          },
          {
            "name": "San Juan Del Sur",
            "url": "https://www.lonelyplanet.com/destinations/nicaragua/southwestern-nicaragua/san-juan-del-sur"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "North Macedonia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/macedonia",
        "cities": [
          {
            "name": "Lake Ohrid",
            "url": "https://www.lonelyplanet.com/destinations/north-macedonia/lake-ohrid"
          },
          {
            "name": "Mavrovo National Park",
            "url": "https://www.lonelyplanet.com/destinations/macedonia/western-macedonia/mavrovo-national-park"
          },
          {
            "name": "Ohrid",
            "url": "https://www.lonelyplanet.com/destinations/macedonia/southern-macedonia/ohrid"
          },
          {
            "name": "Skopje",
            "url": "https://www.lonelyplanet.com/destinations/macedonia/skopje"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Panama",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/panama",
        "cities": [
          {
            "name": "Archipiélago de Bocas del Toro",
            "url": "https://www.lonelyplanet.com/destinations/panama/archipielago-de-bocas-del-toro"
          },
          {
            "name": "Bocas del Toro Province",
            "url": "https://www.lonelyplanet.com/destinations/panama/bocas-del-toro-province"
          },
          {
            "name": "Bocas del Toro Town",
            "url": "https://www.lonelyplanet.com/destinations/panama/bocas-del-toro"
          },
          {
            "name": "Boquete",
            "url": "https://www.lonelyplanet.com/destinations/panama/chiriqui-province/boquete"
          },
          {
            "name": "Chiriquí Province",
            "url": "https://www.lonelyplanet.com/destinations/panama/chiriqui-province"
          },
          {
            "name": "Comarca de Guna Yala",
            "url": "https://www.lonelyplanet.com/destinations/panama/comarca-de-kuna-yala"
          },
          {
            "name": "Darién Province",
            "url": "https://www.lonelyplanet.com/destinations/panama/darien-province"
          },
          {
            "name": "El Valle",
            "url": "https://www.lonelyplanet.com/destinations/panama/the-interior/el-valle"
          },
          {
            "name": "Isla Bastimentos",
            "url": "https://www.lonelyplanet.com/destinations/panama/bocas-del-toro/isla-bastimentos"
          },
          {
            "name": "Isla Colón",
            "url": "https://www.lonelyplanet.com/destinations/panama/bocas-del-toro/isla-colon"
          },
          {
            "name": "Panama Canal",
            "url": "https://www.lonelyplanet.com/destinations/panama/panama-canal"
          },
          {
            "name": "Panama City",
            "url": "https://www.lonelyplanet.com/destinations/panama/panama-city"
          },
          {
            "name": "Península de Azuero",
            "url": "https://www.lonelyplanet.com/destinations/panama/peninsula-de-azuero"
          },
          {
            "name": "Portobelo",
            "url": "https://www.lonelyplanet.com/destinations/panama/colon-province/portobelo"
          },
          {
            "name": "Santa Catalina",
            "url": "https://www.lonelyplanet.com/destinations/panama/the-interior/santa-catalina"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Poland",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/poland",
        "cities": [
          {
            "name": "Białowieża National Park",
            "url": "https://www.lonelyplanet.com/destinations/poland/mazovia-and-podlasie/bialowieza-national-park"
          },
          {
            "name": "Carpathian Mountains",
            "url": "https://www.lonelyplanet.com/destinations/poland/the-carpathian-mountains"
          },
          {
            "name": "Gdańsk",
            "url": "https://www.lonelyplanet.com/destinations/poland/pomerania/gdansk"
          },
          {
            "name": "Gdańsk & Pomerania",
            "url": "https://www.lonelyplanet.com/destinations/poland/pomerania"
          },
          {
            "name": "Katowice",
            "url": "https://www.lonelyplanet.com/destinations/poland/katowice"
          },
          {
            "name": "Kraków",
            "url": "https://www.lonelyplanet.com/destinations/poland/malopolska/krakow"
          },
          {
            "name": "Łódź",
            "url": "https://www.lonelyplanet.com/destinations/poland/lodz"
          },
          {
            "name": "Małopolska",
            "url": "https://www.lonelyplanet.com/destinations/poland/malopolska"
          },
          {
            "name": "Mazovia & Podlasie",
            "url": "https://www.lonelyplanet.com/destinations/poland/mazovia-and-podlasie"
          },
          {
            "name": "Poznań",
            "url": "https://www.lonelyplanet.com/destinations/poland/wielkopolska/poznan"
          },
          {
            "name": "Sopot",
            "url": "https://www.lonelyplanet.com/destinations/poland/pomerania/sopot"
          },
          {
            "name": "Szczecin",
            "url": "https://www.lonelyplanet.com/destinations/poland/pomerania/szczecin"
          },
          {
            "name": "The Great Masurian Lakes",
            "url": "https://www.lonelyplanet.com/destinations/poland/warmia-and-masuria/great-masurian-lakes"
          },
          {
            "name": "Warmia & Masuria",
            "url": "https://www.lonelyplanet.com/destinations/poland/warmia-and-masuria"
          },
          {
            "name": "Warsaw",
            "url": "https://www.lonelyplanet.com/destinations/poland/warsaw"
          },
          {
            "name": "Wrocław",
            "url": "https://www.lonelyplanet.com/destinations/poland/silesia/wroclaw"
          },
          {
            "name": "Zakopane",
            "url": "https://www.lonelyplanet.com/destinations/poland/malopolska/zakopane"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Portugal",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/portugal",
        "cities": [
          {
            "name": "Albufeira",
            "url": "https://www.lonelyplanet.com/destinations/portugal/albufeira"
          },
          {
            "name": "Aljezur",
            "url": "https://www.lonelyplanet.com/destinations/portugal/aljezur"
          },
          {
            "name": "Aveiro",
            "url": "https://www.lonelyplanet.com/destinations/portugal/aveiro"
          },
          {
            "name": "Braga",
            "url": "https://www.lonelyplanet.com/destinations/portugal/the-north/braga"
          },
          {
            "name": "Carrapateira",
            "url": "https://www.lonelyplanet.com/destinations/portugal/carrapateira"
          },
          {
            "name": "Carvoeiro",
            "url": "https://www.lonelyplanet.com/destinations/portugal/carvoeiro"
          },
          {
            "name": "Cascais",
            "url": "https://www.lonelyplanet.com/destinations/portugal/lisbon/cascais"
          },
          {
            "name": "Coimbra",
            "url": "https://www.lonelyplanet.com/destinations/portugal/central-portugal/coimbra"
          },
          {
            "name": "Costa Vicentina",
            "url": "https://www.lonelyplanet.com/destinations/portugal/costa-vicentina"
          },
          {
            "name": "Ericeira",
            "url": "https://www.lonelyplanet.com/destinations/portugal/ericeira"
          },
          {
            "name": "Estremadura & Ribatejo",
            "url": "https://www.lonelyplanet.com/destinations/portugal/estremadura-ribatejo"
          },
          {
            "name": "Évora",
            "url": "https://www.lonelyplanet.com/destinations/portugal/central-portugal/evora"
          },
          {
            "name": "Faro",
            "url": "https://www.lonelyplanet.com/destinations/portugal/the-algarve/faro"
          },
          {
            "name": "Funchal",
            "url": "https://www.lonelyplanet.com/destinations/portugal/funchal"
          },
          {
            "name": "Guimarães",
            "url": "https://www.lonelyplanet.com/destinations/portugal/guimaraes"
          },
          {
            "name": "Lagos",
            "url": "https://www.lonelyplanet.com/destinations/portugal/the-algarve/lagos"
          },
          {
            "name": "Lisbon",
            "url": "https://www.lonelyplanet.com/destinations/portugal/lisbon"
          },
          {
            "name": "Madeira",
            "url": "https://www.lonelyplanet.com/destinations/portugal/madeira"
          },
          {
            "name": "Monchique",
            "url": "https://www.lonelyplanet.com/destinations/portugal/the-algarve/monchique"
          },
          {
            "name": "Nazaré",
            "url": "https://www.lonelyplanet.com/destinations/portugal/central-portugal/nazare"
          },
          {
            "name": "Óbidos",
            "url": "https://www.lonelyplanet.com/destinations/portugal/central-portugal/obidos"
          },
          {
            "name": "Odeceixe",
            "url": "https://www.lonelyplanet.com/destinations/portugal/odeceixe"
          },
          {
            "name": "Olhão",
            "url": "https://www.lonelyplanet.com/destinations/portugal/olhao"
          },
          {
            "name": "Parque Nacional da Peneda-Gerês",
            "url": "https://www.lonelyplanet.com/destinations/portugal/the-north/parque-nacional-da-peneda-geres"
          },
          {
            "name": "Parque Natural da Arrábida",
            "url": "https://www.lonelyplanet.com/destinations/portugal/parque-natural-da-arrabida"
          },
          {
            "name": "Parque Natural da Serra da Estrela",
            "url": "https://www.lonelyplanet.com/destinations/portugal/parque-natural-da-serra-da-estrela"
          },
          {
            "name": "Peniche",
            "url": "https://www.lonelyplanet.com/destinations/portugal/peniche"
          },
          {
            "name": "Peso da Régua",
            "url": "https://www.lonelyplanet.com/destinations/portugal/peso-da-regua"
          },
          {
            "name": "Pinhão",
            "url": "https://www.lonelyplanet.com/destinations/portugal/pinhao"
          },
          {
            "name": "Portimão",
            "url": "https://www.lonelyplanet.com/destinations/portugal/portimao"
          },
          {
            "name": "Porto",
            "url": "https://www.lonelyplanet.com/destinations/portugal/the-north/porto"
          },
          {
            "name": "Sagres",
            "url": "https://www.lonelyplanet.com/destinations/portugal/the-algarve/sagres"
          },
          {
            "name": "Setúbal",
            "url": "https://www.lonelyplanet.com/destinations/portugal/lisbon/setubal"
          },
          {
            "name": "Setúbal Peninsula",
            "url": "https://www.lonelyplanet.com/destinations/portugal/setubal-peninsula"
          },
          {
            "name": "Silves",
            "url": "https://www.lonelyplanet.com/destinations/portugal/the-algarve/silves"
          },
          {
            "name": "Sintra",
            "url": "https://www.lonelyplanet.com/destinations/portugal/lisbon/sintra"
          },
          {
            "name": "Tavira",
            "url": "https://www.lonelyplanet.com/destinations/portugal/the-algarve/tavira"
          },
          {
            "name": "The Alentejo",
            "url": "https://www.lonelyplanet.com/destinations/portugal/the-alentejo"
          },
          {
            "name": "The Algarve",
            "url": "https://www.lonelyplanet.com/destinations/portugal/the-algarve"
          },
          {
            "name": "The Azores",
            "url": "https://www.lonelyplanet.com/destinations/portugal/the-azores-1341351"
          },
          {
            "name": "The Beiras",
            "url": "https://www.lonelyplanet.com/destinations/portugal/the-beiras"
          },
          {
            "name": "The Douro",
            "url": "https://www.lonelyplanet.com/destinations/portugal/the-douro"
          },
          {
            "name": "The Douro & Trás-os-Montes",
            "url": "https://www.lonelyplanet.com/destinations/portugal/the-douro-tras-os-montes"
          },
          {
            "name": "The Minho",
            "url": "https://www.lonelyplanet.com/destinations/portugal/the-minho"
          },
          {
            "name": "Tomar",
            "url": "https://www.lonelyplanet.com/destinations/portugal/central-portugal/tomar"
          },
          {
            "name": "Viana do Castelo",
            "url": "https://www.lonelyplanet.com/destinations/portugal/the-north/viana-do-castelo"
          },
          {
            "name": "Vila Nova De Milfontes",
            "url": "https://www.lonelyplanet.com/destinations/portugal/vila-nova-de-milfontes"
          },
          {
            "name": "Viseu",
            "url": "https://www.lonelyplanet.com/destinations/portugal/viseu"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Romania",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/romania",
        "cities": [
          {
            "name": "Braşov",
            "url": "https://www.lonelyplanet.com/destinations/romania/transylvania/brasov"
          },
          {
            "name": "Bucharest",
            "url": "https://www.lonelyplanet.com/destinations/romania/bucharest"
          },
          {
            "name": "Cluj-Napoca",
            "url": "https://www.lonelyplanet.com/destinations/romania/transylvania/cluj-napoca"
          },
          {
            "name": "Constanţa",
            "url": "https://www.lonelyplanet.com/destinations/romania/northern-dobrogea/constanta"
          },
          {
            "name": "Sibiu",
            "url": "https://www.lonelyplanet.com/destinations/romania/transylvania/sibiu"
          },
          {
            "name": "Sinaia",
            "url": "https://www.lonelyplanet.com/destinations/romania/transylvania/sinaia"
          },
          {
            "name": "Transylvania",
            "url": "https://www.lonelyplanet.com/destinations/romania/transylvania"
          },
          {
            "name": "Wallachia",
            "url": "https://www.lonelyplanet.com/destinations/romania/wallachia"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Russia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/russia",
        "cities": [
          {
            "name": "Kamchatka",
            "url": "https://www.lonelyplanet.com/destinations/russia/russian-far-east/kamchatka"
          },
          {
            "name": "Moscow",
            "url": "https://www.lonelyplanet.com/destinations/russia/moscow"
          },
          {
            "name": "Petropavlovsk-Kamchatsky",
            "url": "https://www.lonelyplanet.com/destinations/russia/russian-far-east/petropavlovsk-kamchatsky"
          },
          {
            "name": "Russian Far East",
            "url": "https://www.lonelyplanet.com/destinations/russia/russian-far-east"
          },
          {
            "name": "Sakhalin Island",
            "url": "https://www.lonelyplanet.com/destinations/russia/russian-far-east/sakhalin-island"
          },
          {
            "name": "St Petersburg",
            "url": "https://www.lonelyplanet.com/destinations/russia/st-petersburg"
          },
          {
            "name": "Vladivostok",
            "url": "https://www.lonelyplanet.com/destinations/russia/russian-far-east/vladivostok"
          },
          {
            "name": "Western Siberia",
            "url": "https://www.lonelyplanet.com/destinations/russia/siberia"
          },
          {
            "name": "Yakutsk",
            "url": "https://www.lonelyplanet.com/destinations/russia/russian-far-east/yakutsk"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Scotland",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/scotland",
        "cities": [
          {
            "name": "Aberdeen",
            "url": "https://www.lonelyplanet.com/destinations/scotland/central-scotland/aberdeen"
          },
          {
            "name": "Central Highlands",
            "url": "https://www.lonelyplanet.com/destinations/scotland/central-highlands"
          },
          {
            "name": "Central Scotland",
            "url": "https://www.lonelyplanet.com/destinations/scotland/central-scotland"
          },
          {
            "name": "Edinburgh",
            "url": "https://www.lonelyplanet.com/destinations/scotland/edinburgh"
          },
          {
            "name": "Fort William",
            "url": "https://www.lonelyplanet.com/destinations/scotland/highlands-and-northern-islands/fort-william-and-around"
          },
          {
            "name": "Glasgow",
            "url": "https://www.lonelyplanet.com/destinations/scotland/glasgow"
          },
          {
            "name": "Highland Perthshire",
            "url": "https://www.lonelyplanet.com/destinations/scotland/highland-perthshire"
          },
          {
            "name": "Inverness",
            "url": "https://www.lonelyplanet.com/destinations/scotland/highlands-and-northern-islands/inverness"
          },
          {
            "name": "Kirkwall",
            "url": "https://www.lonelyplanet.com/destinations/scotland/highlands-and-northern-islands/kirkwall"
          },
          {
            "name": "Loch Lomond",
            "url": "https://www.lonelyplanet.com/destinations/scotland/loch-lomond"
          },
          {
            "name": "Lowland Perthshire & Kinross",
            "url": "https://www.lonelyplanet.com/destinations/scotland/central-scotland/perthshire-and-kinross"
          },
          {
            "name": "Northeast Scotland",
            "url": "https://www.lonelyplanet.com/destinations/scotland/northeast-scotland"
          },
          {
            "name": "Northern Highlands & Islands",
            "url": "https://www.lonelyplanet.com/destinations/scotland/highlands-and-northern-islands"
          },
          {
            "name": "North & West Coast",
            "url": "https://www.lonelyplanet.com/destinations/scotland/highlands-and-northern-islands/north-and-west-coast"
          },
          {
            "name": "Orkney",
            "url": "https://www.lonelyplanet.com/destinations/scotland/highlands-and-northern-islands/orkney-islands"
          },
          {
            "name": "Orkney & Shetland",
            "url": "https://www.lonelyplanet.com/destinations/scotland/orkney-shetland"
          },
          {
            "name": "Outer Hebrides",
            "url": "https://www.lonelyplanet.com/destinations/scotland/highlands-and-northern-islands/outer-hebrides"
          },
          {
            "name": "Portree (Port Righ)",
            "url": "https://www.lonelyplanet.com/destinations/scotland/highlands-and-northern-islands/portree-port-righ"
          },
          {
            "name": "Shetland",
            "url": "https://www.lonelyplanet.com/destinations/scotland/highlands-and-northern-islands/shetland-islands"
          },
          {
            "name": "Skye",
            "url": "https://www.lonelyplanet.com/destinations/scotland/highlands-and-northern-islands/isle-of-skye"
          },
          {
            "name": "Southern Highlands & Islands",
            "url": "https://www.lonelyplanet.com/destinations/scotland/southern-highlands-islands"
          },
          {
            "name": "Southern Scotland",
            "url": "https://www.lonelyplanet.com/destinations/scotland/southern-scotland"
          },
          {
            "name": "Stirling",
            "url": "https://www.lonelyplanet.com/destinations/scotland/central-scotland/stirling"
          },
          {
            "name": "The Cairngorms",
            "url": "https://www.lonelyplanet.com/destinations/scotland/highlands-and-northern-islands/the-cairngorms"
          },
          {
            "name": "The Highlands & Islands",
            "url": "https://www.lonelyplanet.com/destinations/scotland/the-highlands-islands"
          },
          {
            "name": "Trotternish",
            "url": "https://www.lonelyplanet.com/destinations/scotland/trotternish"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Serbia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/serbia",
        "cities": [
          {
            "name": "Belgrade",
            "url": "https://www.lonelyplanet.com/destinations/serbia/belgrade"
          },
          {
            "name": "Fruška Gora National Park",
            "url": "https://www.lonelyplanet.com/destinations/serbia/fruska-gora-national-park"
          },
          {
            "name": "Novi Sad",
            "url": "https://www.lonelyplanet.com/destinations/serbia/vojvodina/novi-sad"
          },
          {
            "name": "Subotica",
            "url": "https://www.lonelyplanet.com/destinations/serbia/vojvodina/subotica"
          },
          {
            "name": "Tara National Park",
            "url": "https://www.lonelyplanet.com/destinations/serbia/tara-national-park"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Slovakia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/slovakia",
        "cities": [
          {
            "name": "Bratislava",
            "url": "https://www.lonelyplanet.com/destinations/slovakia/bratislava"
          },
          {
            "name": "Eastern Slovakia",
            "url": "https://www.lonelyplanet.com/destinations/slovakia/east-slovakia"
          },
          {
            "name": "Košice",
            "url": "https://www.lonelyplanet.com/destinations/slovakia/east-slovakia/kosice"
          },
          {
            "name": "Tatra Mountains",
            "url": "https://www.lonelyplanet.com/destinations/slovakia/tatra-mountains"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Slovenia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/slovenia",
        "cities": [
          {
            "name": "Izola",
            "url": "https://www.lonelyplanet.com/destinations/slovenia/izola"
          },
          {
            "name": "Koper",
            "url": "https://www.lonelyplanet.com/destinations/slovenia/karst-and-coast/koper"
          },
          {
            "name": "Lake Bled",
            "url": "https://www.lonelyplanet.com/destinations/slovenia/julian-alps/bled"
          },
          {
            "name": "Lake Bohinj",
            "url": "https://www.lonelyplanet.com/destinations/slovenia/julian-alps/bohinj"
          },
          {
            "name": "Ljubljana",
            "url": "https://www.lonelyplanet.com/destinations/slovenia/ljubljana"
          },
          {
            "name": "Maribor",
            "url": "https://www.lonelyplanet.com/destinations/slovenia/maribor"
          },
          {
            "name": "Piran",
            "url": "https://www.lonelyplanet.com/destinations/slovenia/karst-and-coast/piran"
          },
          {
            "name": "Slovenian Coast",
            "url": "https://www.lonelyplanet.com/destinations/slovenia/slovenian-coast"
          },
          {
            "name": "Soča Valley",
            "url": "https://www.lonelyplanet.com/destinations/slovenia/julian-alps/soca-valley"
          },
          {
            "name": "The Julian Alps",
            "url": "https://www.lonelyplanet.com/destinations/slovenia/the-julian-alps"
          },
          {
            "name": "Triglav National Park",
            "url": "https://www.lonelyplanet.com/destinations/slovenia/triglav-national-park"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Spain",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/spain",
        "cities": [
          {
            "name": "A Coruña",
            "url": "https://www.lonelyplanet.com/destinations/spain/cantabria-asturias-and-galicia/la-coruna"
          },
          {
            "name": "Aínsa",
            "url": "https://www.lonelyplanet.com/destinations/spain/ainsa"
          },
          {
            "name": "Albarracín",
            "url": "https://www.lonelyplanet.com/destinations/spain/albarracin"
          },
          {
            "name": "Alcúdia",
            "url": "https://www.lonelyplanet.com/destinations/spain/alcudia"
          },
          {
            "name": "Alicante",
            "url": "https://www.lonelyplanet.com/destinations/spain/valencia-and-murcia/alicante"
          },
          {
            "name": "Alicante Province",
            "url": "https://www.lonelyplanet.com/destinations/spain/alicante-province"
          },
          {
            "name": "Almería",
            "url": "https://www.lonelyplanet.com/destinations/spain/andalucia/almeria"
          },
          {
            "name": "Andalucía",
            "url": "https://www.lonelyplanet.com/destinations/spain/andalucia"
          },
          {
            "name": "Aragón",
            "url": "https://www.lonelyplanet.com/destinations/spain/aragon-basque-country-and-navarra"
          },
          {
            "name": "Arcos de la Frontera",
            "url": "https://www.lonelyplanet.com/destinations/spain/andalucia/arcos-de-la-frontera"
          },
          {
            "name": "Arrecife",
            "url": "https://www.lonelyplanet.com/destinations/canary-islands/lanzarote/arrecife"
          },
          {
            "name": "Asturias",
            "url": "https://www.lonelyplanet.com/destinations/spain/asturias"
          },
          {
            "name": "Ávila",
            "url": "https://www.lonelyplanet.com/destinations/spain/castilla-y-leon/avila"
          },
          {
            "name": "Badajoz",
            "url": "https://www.lonelyplanet.com/destinations/spain/badajoz"
          },
          {
            "name": "Barcelona",
            "url": "https://www.lonelyplanet.com/destinations/spain/barcelona"
          },
          {
            "name": "Basque Country",
            "url": "https://www.lonelyplanet.com/destinations/spain/basque-country"
          },
          {
            "name": "Benidorm",
            "url": "https://www.lonelyplanet.com/destinations/spain/benidorm"
          },
          {
            "name": "Bilbao",
            "url": "https://www.lonelyplanet.com/destinations/spain/aragon-basque-country-and-navarra/bilbao"
          },
          {
            "name": "Burgos",
            "url": "https://www.lonelyplanet.com/destinations/spain/castilla-y-leon/burgos"
          },
          {
            "name": "Cáceres",
            "url": "https://www.lonelyplanet.com/destinations/spain/extremadura/caceres"
          },
          {
            "name": "Cadaqués",
            "url": "https://www.lonelyplanet.com/destinations/spain/cadaques"
          },
          {
            "name": "Cádiz",
            "url": "https://www.lonelyplanet.com/destinations/spain/andalucia/cadiz"
          },
          {
            "name": "Calella de Palafrugell",
            "url": "https://www.lonelyplanet.com/destinations/spain/calella-de-palafrugell"
          },
          {
            "name": "Canary Islands",
            "url": "https://www.lonelyplanet.com/destinations/canary-islands"
          },
          {
            "name": "Cantabria",
            "url": "https://www.lonelyplanet.com/destinations/spain/cantabria"
          },
          {
            "name": "Cartagena",
            "url": "https://www.lonelyplanet.com/destinations/spain/cartagena"
          },
          {
            "name": "Castilla-La Mancha",
            "url": "https://www.lonelyplanet.com/destinations/spain/castilla-la-mancha"
          },
          {
            "name": "Castilla y León",
            "url": "https://www.lonelyplanet.com/destinations/spain/castilla-y-leon"
          },
          {
            "name": "Catalonia",
            "url": "https://www.lonelyplanet.com/destinations/spain/catalonia"
          },
          {
            "name": "Ciutadella",
            "url": "https://www.lonelyplanet.com/destinations/spain/ciutadella"
          },
          {
            "name": "Comillas",
            "url": "https://www.lonelyplanet.com/destinations/spain/cantabria/comillas"
          },
          {
            "name": "Córdoba",
            "url": "https://www.lonelyplanet.com/destinations/spain/andalucia/cordoba"
          },
          {
            "name": "Corralejo",
            "url": "https://www.lonelyplanet.com/destinations/canary-islands/fuerteventura/corralejo"
          },
          {
            "name": "Costa Blanca",
            "url": "https://www.lonelyplanet.com/destinations/spain/valencia-and-murcia/costa-blanca"
          },
          {
            "name": "Costa Brava",
            "url": "https://www.lonelyplanet.com/destinations/spain/costa-brava"
          },
          {
            "name": "Costa del Sol",
            "url": "https://www.lonelyplanet.com/destinations/spain/andalucia/costa-del-sol"
          },
          {
            "name": "Cuenca",
            "url": "https://www.lonelyplanet.com/destinations/spain/castilla-la-mancha/cuenca"
          },
          {
            "name": "Dénia",
            "url": "https://www.lonelyplanet.com/destinations/spain/denia"
          },
          {
            "name": "Eastern Mallorca",
            "url": "https://www.lonelyplanet.com/destinations/spain/eastern-mallorca"
          },
          {
            "name": "El Cotillo",
            "url": "https://www.lonelyplanet.com/destinations/canary-islands/fuerteventura/el-cotillo"
          },
          {
            "name": "El Puerto de Santa María",
            "url": "https://www.lonelyplanet.com/destinations/spain/andalucia/el-puerto-de-santa-maria"
          },
          {
            "name": "Estepona",
            "url": "https://www.lonelyplanet.com/destinations/spain/andalucia/estepona"
          },
          {
            "name": "Extremadura",
            "url": "https://www.lonelyplanet.com/destinations/spain/extremadura"
          },
          {
            "name": "Figueres",
            "url": "https://www.lonelyplanet.com/destinations/spain/figueres"
          },
          {
            "name": "Formentera",
            "url": "https://www.lonelyplanet.com/destinations/spain/formentera"
          },
          {
            "name": "Fuengirola",
            "url": "https://www.lonelyplanet.com/destinations/spain/andalucia/fuengirola"
          },
          {
            "name": "Fuerteventura",
            "url": "https://www.lonelyplanet.com/destinations/canary-islands/fuerteventura"
          },
          {
            "name": "Galicia",
            "url": "https://www.lonelyplanet.com/destinations/spain/galicia"
          },
          {
            "name": "Gijón",
            "url": "https://www.lonelyplanet.com/destinations/spain/asturias/gijon"
          },
          {
            "name": "Girona",
            "url": "https://www.lonelyplanet.com/destinations/spain/catalonia/girona"
          },
          {
            "name": "Granada",
            "url": "https://www.lonelyplanet.com/destinations/spain/granada"
          },
          {
            "name": "Gran Canaria",
            "url": "https://www.lonelyplanet.com/destinations/canary-islands/gran-canaria"
          },
          {
            "name": "Hondarribia",
            "url": "https://www.lonelyplanet.com/destinations/spain/basque-country/hondarribia"
          },
          {
            "name": "Ibiza",
            "url": "https://www.lonelyplanet.com/destinations/spain/ibiza"
          },
          {
            "name": "Ibiza Town",
            "url": "https://www.lonelyplanet.com/destinations/spain/ibiza-town"
          },
          {
            "name": "Jerez de la Frontera",
            "url": "https://www.lonelyplanet.com/destinations/spain/andalucia/jerez-de-la-frontera"
          },
          {
            "name": "La Gomera",
            "url": "https://www.lonelyplanet.com/destinations/canary-islands/la-gomera"
          },
          {
            "name": "La Laguna",
            "url": "https://www.lonelyplanet.com/destinations/canary-islands/tenerife/la-laguna"
          },
          {
            "name": "Lanzarote",
            "url": "https://www.lonelyplanet.com/destinations/canary-islands/lanzarote"
          },
          {
            "name": "La Palma",
            "url": "https://www.lonelyplanet.com/destinations/canary-islands/la-palma"
          },
          {
            "name": "La Rioja",
            "url": "https://www.lonelyplanet.com/destinations/spain/la-rioja"
          },
          {
            "name": "Las Palmas de Gran Canaria",
            "url": "https://www.lonelyplanet.com/destinations/canary-islands/gran-canaria/las-palmas-de-gran-canaria"
          },
          {
            "name": "León",
            "url": "https://www.lonelyplanet.com/destinations/spain/castilla-y-leon/leon"
          },
          {
            "name": "Logroño",
            "url": "https://www.lonelyplanet.com/destinations/spain/la-rioja/logrono"
          },
          {
            "name": "Los Caños de Meca",
            "url": "https://www.lonelyplanet.com/destinations/spain/andalucia/los-canos-de-meca"
          },
          {
            "name": "Los Cristianos, Playa de las Américas & Costa Adeje",
            "url": "https://www.lonelyplanet.com/destinations/canary-islands/tenerife/los-cristianos-playa-de-las-americas-and-costa-adeje"
          },
          {
            "name": "Madrid",
            "url": "https://www.lonelyplanet.com/destinations/spain/madrid"
          },
          {
            "name": "Málaga",
            "url": "https://www.lonelyplanet.com/destinations/spain/andalucia/malaga"
          },
          {
            "name": "Málaga Province",
            "url": "https://www.lonelyplanet.com/destinations/spain/andalucia/malaga-province"
          },
          {
            "name": "Mallorca",
            "url": "https://www.lonelyplanet.com/destinations/spain/mallorca"
          },
          {
            "name": "Marbella",
            "url": "https://www.lonelyplanet.com/destinations/spain/andalucia/marbella"
          },
          {
            "name": "Maspalomas",
            "url": "https://www.lonelyplanet.com/destinations/canary-islands/gran-canaria/playa-del-ingles-and-maspalomas"
          },
          {
            "name": "Menorca",
            "url": "https://www.lonelyplanet.com/destinations/spain/balearic-islands/menorca"
          },
          {
            "name": "Mérida",
            "url": "https://www.lonelyplanet.com/destinations/spain/extremadura/merida"
          },
          {
            "name": "Montserrat",
            "url": "https://www.lonelyplanet.com/destinations/spain/catalonia/monestir-de-montserrat"
          },
          {
            "name": "Morro Jable",
            "url": "https://www.lonelyplanet.com/destinations/canary-islands/fuerteventura/morro-jable"
          },
          {
            "name": "Murcia",
            "url": "https://www.lonelyplanet.com/destinations/spain/murcia"
          },
          {
            "name": "Murcia Province",
            "url": "https://www.lonelyplanet.com/destinations/spain/murcia-province"
          },
          {
            "name": "Nerja",
            "url": "https://www.lonelyplanet.com/destinations/spain/andalucia/nerja"
          },
          {
            "name": "North Coast Tenerife",
            "url": "https://www.lonelyplanet.com/destinations/canary-islands/tenerife/the-north"
          },
          {
            "name": "Northern Mallorca",
            "url": "https://www.lonelyplanet.com/destinations/spain/northern-mallorca"
          },
          {
            "name": "North & Interior Ibiza",
            "url": "https://www.lonelyplanet.com/destinations/spain/north-interior-ibiza"
          },
          {
            "name": "Oviedo",
            "url": "https://www.lonelyplanet.com/destinations/spain/asturias/oviedo"
          },
          {
            "name": "Palafrugell & Around",
            "url": "https://www.lonelyplanet.com/destinations/spain/palafrugell-around"
          },
          {
            "name": "Palma de Mallorca",
            "url": "https://www.lonelyplanet.com/destinations/spain/palma-de-mallorca"
          },
          {
            "name": "Pamplona",
            "url": "https://www.lonelyplanet.com/destinations/spain/aragon-basque-country-and-navarra/pamplona"
          },
          {
            "name": "Picos de Europa",
            "url": "https://www.lonelyplanet.com/destinations/spain/picos-de-europa"
          },
          {
            "name": "Playa Blanca",
            "url": "https://www.lonelyplanet.com/destinations/canary-islands/lanzarote/playa-blanca"
          },
          {
            "name": "Pollença",
            "url": "https://www.lonelyplanet.com/destinations/spain/pollenca"
          },
          {
            "name": "Pontevedra",
            "url": "https://www.lonelyplanet.com/destinations/spain/pontevedra"
          },
          {
            "name": "Puerto de la Cruz",
            "url": "https://www.lonelyplanet.com/destinations/canary-islands/tenerife/puerto-de-la-cruz"
          },
          {
            "name": "Puerto del Carmen",
            "url": "https://www.lonelyplanet.com/destinations/canary-islands/lanzarote/puerto-del-carmen"
          },
          {
            "name": "Puerto de Mogán",
            "url": "https://www.lonelyplanet.com/destinations/canary-islands/gran-canaria/puerto-de-mogan"
          },
          {
            "name": "Ribadeo",
            "url": "https://www.lonelyplanet.com/destinations/spain/ribadeo"
          },
          {
            "name": "Ronda",
            "url": "https://www.lonelyplanet.com/destinations/spain/andalucia/ronda"
          },
          {
            "name": "Salamanca",
            "url": "https://www.lonelyplanet.com/destinations/spain/castilla-y-leon/salamanca"
          },
          {
            "name": "Sanlúcar de Barrameda",
            "url": "https://www.lonelyplanet.com/destinations/spain/andalucia/sanlucar-de-barrameda"
          },
          {
            "name": "San Sebastián",
            "url": "https://www.lonelyplanet.com/destinations/spain/aragon-basque-country-and-navarra/san-sebastian"
          },
          {
            "name": "Santa Cruz de la Palma",
            "url": "https://www.lonelyplanet.com/destinations/canary-islands/la-palma/santa-cruz-de-la-palma"
          },
          {
            "name": "Santa Cruz de Tenerife",
            "url": "https://www.lonelyplanet.com/destinations/canary-islands/tenerife/santa-cruz-de-tenerife"
          },
          {
            "name": "Santander",
            "url": "https://www.lonelyplanet.com/destinations/spain/cantabria-asturias-and-galicia/santander"
          },
          {
            "name": "Santiago de Compostela",
            "url": "https://www.lonelyplanet.com/destinations/spain/cantabria-asturias-and-galicia/santiago-de-compostela"
          },
          {
            "name": "Santillana del Mar",
            "url": "https://www.lonelyplanet.com/destinations/spain/cantabria/santillana-del-mar"
          },
          {
            "name": "San Vicente de la Barquera",
            "url": "https://www.lonelyplanet.com/destinations/spain/cantabria/san-vicente-de-la-barquera"
          },
          {
            "name": "Segovia",
            "url": "https://www.lonelyplanet.com/destinations/spain/castilla-y-leon/segovia"
          },
          {
            "name": "Seville",
            "url": "https://www.lonelyplanet.com/destinations/spain/seville"
          },
          {
            "name": "Sitges",
            "url": "https://www.lonelyplanet.com/destinations/spain/sitges"
          },
          {
            "name": "Sóller",
            "url": "https://www.lonelyplanet.com/destinations/spain/soller"
          },
          {
            "name": "Southern Mallorca",
            "url": "https://www.lonelyplanet.com/destinations/spain/southern-mallorca"
          },
          {
            "name": "Tarifa",
            "url": "https://www.lonelyplanet.com/destinations/spain/andalucia/tarifa"
          },
          {
            "name": "Tarragona",
            "url": "https://www.lonelyplanet.com/destinations/spain/catalonia/tarragona"
          },
          {
            "name": "Tenerife",
            "url": "https://www.lonelyplanet.com/destinations/canary-islands/tenerife"
          },
          {
            "name": "The Catalan Pyrenees",
            "url": "https://www.lonelyplanet.com/destinations/spain/the-catalan-pyrenees"
          },
          {
            "name": "Toledo",
            "url": "https://www.lonelyplanet.com/destinations/spain/castilla-la-mancha/toledo"
          },
          {
            "name": "Tossa de Mar",
            "url": "https://www.lonelyplanet.com/destinations/spain/tossa-de-mar"
          },
          {
            "name": "Valencia",
            "url": "https://www.lonelyplanet.com/destinations/spain/valencia-and-murcia/valencia"
          },
          {
            "name": "Valencia Region",
            "url": "https://www.lonelyplanet.com/destinations/spain/valencia-and-murcia"
          },
          {
            "name": "Valladolid",
            "url": "https://www.lonelyplanet.com/destinations/spain/valladolid"
          },
          {
            "name": "Valldemossa",
            "url": "https://www.lonelyplanet.com/destinations/spain/valldemossa"
          },
          {
            "name": "Vejer de la Frontera",
            "url": "https://www.lonelyplanet.com/destinations/spain/andalucia/vejer-de-la-frontera"
          },
          {
            "name": "Vigo",
            "url": "https://www.lonelyplanet.com/destinations/spain/vigo"
          },
          {
            "name": "Western Mallorca",
            "url": "https://www.lonelyplanet.com/destinations/spain/western-mallorca"
          },
          {
            "name": "Zaragoza",
            "url": "https://www.lonelyplanet.com/destinations/spain/aragon-basque-country-and-navarra/zaragoza"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Sweden",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/sweden",
        "cities": [
          {
            "name": "Abisko",
            "url": "https://www.lonelyplanet.com/destinations/sweden/norrland/abisko"
          },
          {
            "name": "Bohuslän",
            "url": "https://www.lonelyplanet.com/destinations/sweden/bohuslan"
          },
          {
            "name": "Gothenburg",
            "url": "https://www.lonelyplanet.com/destinations/sweden/gotaland/goteborg"
          },
          {
            "name": "Gotland",
            "url": "https://www.lonelyplanet.com/destinations/sweden/gotland"
          },
          {
            "name": "Lappland",
            "url": "https://www.lonelyplanet.com/destinations/sweden/lappland"
          },
          {
            "name": "Lund",
            "url": "https://www.lonelyplanet.com/destinations/sweden/skane/lund"
          },
          {
            "name": "Malmö",
            "url": "https://www.lonelyplanet.com/destinations/sweden/skane/malmo"
          },
          {
            "name": "Southern Sweden",
            "url": "https://www.lonelyplanet.com/destinations/sweden/southern-sweden"
          },
          {
            "name": "Stockholm",
            "url": "https://www.lonelyplanet.com/destinations/sweden/stockholm"
          },
          {
            "name": "Stockholm Archipelago",
            "url": "https://www.lonelyplanet.com/destinations/sweden/stockholm-archipelago"
          },
          {
            "name": "Uppsala",
            "url": "https://www.lonelyplanet.com/destinations/sweden/svealand/uppsala"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Switzerland",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/switzerland",
        "cities": [
          {
            "name": "Basel",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/northern-switzerland/basel"
          },
          {
            "name": "Bern",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/bern"
          },
          {
            "name": "Bernese Oberland",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/bernese-oberland"
          },
          {
            "name": "Canton of Zürich",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/canton-of-zurich"
          },
          {
            "name": "Central Switzerland",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/central-switzerland-and-berner-oberland"
          },
          {
            "name": "Chur",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/chur"
          },
          {
            "name": "Fribourg, Drei-Seen-Land and The Jura",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/fribourg-drei-seen-land-and-the-jura"
          },
          {
            "name": "Geneva",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/geneva"
          },
          {
            "name": "Graubünden",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/graubunden"
          },
          {
            "name": "Grindelwald",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/grindelwald"
          },
          {
            "name": "Interlaken",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/central-switzerland-and-berner-oberland/interlaken"
          },
          {
            "name": "Lake Geneva & Vaud",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/lake-geneva-region"
          },
          {
            "name": "Lausanne",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/lake-geneva-region/lausanne"
          },
          {
            "name": "Lauterbrunnen",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/lauterbrunnen"
          },
          {
            "name": "Locarno",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/ticino/locarno"
          },
          {
            "name": "Lucerne",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/central-switzerland-and-berner-oberland/lucerne"
          },
          {
            "name": "Lugano",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/ticino/lugano"
          },
          {
            "name": "Montreux",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/lake-geneva-region/montreux"
          },
          {
            "name": "Neuchâtel",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/fribourg-neuchatel-and-the-jura/neuchatel"
          },
          {
            "name": "Northeastern Switzerland",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/northeastern-switzerland"
          },
          {
            "name": "St Moritz",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/graubunden/st-moritz"
          },
          {
            "name": "The Jura Mountains",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/the-jura-mountains"
          },
          {
            "name": "Ticino",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/ticino"
          },
          {
            "name": "Valais",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/valais"
          },
          {
            "name": "Vevey",
            "url": "https://www.lonelyplanet.com/destinations/switzerland/vevey"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "The Netherlands",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/the-netherlands",
        "cities": [
          {
            "name": "Amsterdam",
            "url": "https://www.lonelyplanet.com/destinations/the-netherlands/amsterdam"
          },
          {
            "name": "Delft",
            "url": "https://www.lonelyplanet.com/destinations/the-netherlands/the-randstad/delft"
          },
          {
            "name": "Den Haag",
            "url": "https://www.lonelyplanet.com/destinations/the-netherlands/the-randstad/den-haag"
          },
          {
            "name": "Eindhoven",
            "url": "https://www.lonelyplanet.com/destinations/the-netherlands/eindhoven"
          },
          {
            "name": "Friesland",
            "url": "https://www.lonelyplanet.com/destinations/the-netherlands/friesland"
          },
          {
            "name": "Frisian Islands",
            "url": "https://www.lonelyplanet.com/destinations/the-netherlands/frisian-islands"
          },
          {
            "name": "Groningen",
            "url": "https://www.lonelyplanet.com/destinations/the-netherlands/the-north-and-east/groningen-city"
          },
          {
            "name": "Haarlem",
            "url": "https://www.lonelyplanet.com/destinations/the-netherlands/the-randstad/haarlem"
          },
          {
            "name": "Leiden",
            "url": "https://www.lonelyplanet.com/destinations/the-netherlands/the-randstad/leiden"
          },
          {
            "name": "Maastricht",
            "url": "https://www.lonelyplanet.com/destinations/the-netherlands/the-southeast/maastricht"
          },
          {
            "name": "Nijmegen",
            "url": "https://www.lonelyplanet.com/destinations/the-netherlands/nijmegen"
          },
          {
            "name": "Rotterdam",
            "url": "https://www.lonelyplanet.com/destinations/the-netherlands/rotterdam"
          },
          {
            "name": "Southeastern Netherlands",
            "url": "https://www.lonelyplanet.com/destinations/the-netherlands/southeastern-netherlands"
          },
          {
            "name": "South Holland & Zeeland",
            "url": "https://www.lonelyplanet.com/destinations/the-netherlands/south-holland-zeeland"
          },
          {
            "name": "Utrecht",
            "url": "https://www.lonelyplanet.com/destinations/the-netherlands/the-randstad/utrecht-city"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Türkiye",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/turkey",
        "cities": [
          {
            "name": "Alanya",
            "url": "https://www.lonelyplanet.com/destinations/turkey/mediterranean-coast/alanya"
          },
          {
            "name": "Ankara",
            "url": "https://www.lonelyplanet.com/destinations/turkey/central-anatolia/ankara"
          },
          {
            "name": "Antalya",
            "url": "https://www.lonelyplanet.com/destinations/turkey/mediterranean-coast/antalya"
          },
          {
            "name": "Ayvalık",
            "url": "https://www.lonelyplanet.com/destinations/turkey/aegean-coast/ayvalik"
          },
          {
            "name": "Black Sea Coast",
            "url": "https://www.lonelyplanet.com/destinations/turkey/the-black-sea-and-northeastern-anatolia"
          },
          {
            "name": "Bodrum Peninsula",
            "url": "https://www.lonelyplanet.com/destinations/turkey/bodrum-peninsula"
          },
          {
            "name": "Bodrum Town",
            "url": "https://www.lonelyplanet.com/destinations/turkey/aegean-coast/bodrum"
          },
          {
            "name": "Bursa",
            "url": "https://www.lonelyplanet.com/destinations/turkey/bursa"
          },
          {
            "name": "Çanakkale",
            "url": "https://www.lonelyplanet.com/destinations/turkey/aegean-coast/canakkale"
          },
          {
            "name": "Cappadocia",
            "url": "https://www.lonelyplanet.com/destinations/turkey/cappadocia-kapadokya"
          },
          {
            "name": "Çeşme",
            "url": "https://www.lonelyplanet.com/destinations/turkey/aegean-coast/cesme"
          },
          {
            "name": "Dalyan",
            "url": "https://www.lonelyplanet.com/destinations/turkey/mediterranean-coast/dalyan"
          },
          {
            "name": "Datça & Bozburun Peninsulas",
            "url": "https://www.lonelyplanet.com/destinations/turkey/datca-bozburun-peninsulas"
          },
          {
            "name": "Edirne",
            "url": "https://www.lonelyplanet.com/destinations/turkey/edirne"
          },
          {
            "name": "Ephesus",
            "url": "https://www.lonelyplanet.com/destinations/turkey/aegean-coast/ephesus-efes"
          },
          {
            "name": "Eskişehir",
            "url": "https://www.lonelyplanet.com/destinations/turkey/eskisehir"
          },
          {
            "name": "Fethiye",
            "url": "https://www.lonelyplanet.com/destinations/turkey/mediterranean-coast/fethiye"
          },
          {
            "name": "Gallipoli Peninsula",
            "url": "https://www.lonelyplanet.com/destinations/turkey/gallipoli-peninsula"
          },
          {
            "name": "Gaziantep",
            "url": "https://www.lonelyplanet.com/destinations/turkey/central-anatolia/gaziantep-antep"
          },
          {
            "name": "Göreme",
            "url": "https://www.lonelyplanet.com/destinations/turkey/cappadocia-kapadokya/goreme"
          },
          {
            "name": "Istanbul",
            "url": "https://www.lonelyplanet.com/destinations/turkey/istanbul"
          },
          {
            "name": "İzmir",
            "url": "https://www.lonelyplanet.com/destinations/turkey/aegean-coast/izmir"
          },
          {
            "name": "İzmir & the North Aegean",
            "url": "https://www.lonelyplanet.com/destinations/turkey/izmir-the-north-aegean"
          },
          {
            "name": "Kalkan",
            "url": "https://www.lonelyplanet.com/destinations/turkey/mediterranean-coast/kalkan"
          },
          {
            "name": "Kaş",
            "url": "https://www.lonelyplanet.com/destinations/turkey/mediterranean-coast/kas"
          },
          {
            "name": "Konya",
            "url": "https://www.lonelyplanet.com/destinations/turkey/central-anatolia/konya"
          },
          {
            "name": "Kuşadası",
            "url": "https://www.lonelyplanet.com/destinations/turkey/aegean-coast/kusadasi"
          },
          {
            "name": "Marmaris",
            "url": "https://www.lonelyplanet.com/destinations/turkey/mediterranean-coast/marmaris"
          },
          {
            "name": "Ölüdeniz",
            "url": "https://www.lonelyplanet.com/destinations/turkey/mediterranean-coast/oludeniz"
          },
          {
            "name": "Pamukkale",
            "url": "https://www.lonelyplanet.com/destinations/turkey/aegean-coast/pamukkale"
          },
          {
            "name": "Side",
            "url": "https://www.lonelyplanet.com/destinations/turkey/mediterranean-coast/side"
          },
          {
            "name": "South Aegean",
            "url": "https://www.lonelyplanet.com/destinations/turkey/aegean-coast"
          },
          {
            "name": "Trabzon",
            "url": "https://www.lonelyplanet.com/destinations/turkey/the-black-sea-and-northeastern-anatolia/trabzon"
          },
          {
            "name": "Turquoise Coast",
            "url": "https://www.lonelyplanet.com/destinations/turkey/mediterranean-coast"
          },
          {
            "name": "Ürgüp",
            "url": "https://www.lonelyplanet.com/destinations/turkey/cappadocia-kapadokya/urgup"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Ukraine",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/ukraine",
        "cities": [
          {
            "name": "Kyiv",
            "url": "https://www.lonelyplanet.com/destinations/ukraine/kyiv"
          },
          {
            "name": "Lviv",
            "url": "https://www.lonelyplanet.com/destinations/ukraine/western-ukraine/lviv"
          }
        ]
      },
      {
        "region": "CENTRAL AMERICA",
        "country": "Wales",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/wales",
        "cities": [
          {
            "name": "Cardiff",
            "url": "https://www.lonelyplanet.com/destinations/wales/cardiff-caerdydd"
          },
          {
            "name": "Parc Cenedlaethol Bannau Brycheiniog",
            "url": "https://www.lonelyplanet.com/destinations/wales/brecon-beacons-national-park"
          },
          {
            "name": "Pembrokeshire",
            "url": "https://www.lonelyplanet.com/destinations/wales/pembrokeshire"
          },
          {
            "name": "Snowdonia National Park (Parc Cenedlaethol Eryri)",
            "url": "https://www.lonelyplanet.com/destinations/wales/snowdonia-national-park-parc-cenedlaethol-eryri"
          },
          {
            "name": "Snowdonia & the Llŷn",
            "url": "https://www.lonelyplanet.com/destinations/wales/snowdonia-the-llyn"
          }
        ]
      }
    ]
  },
  {
    "region": "MIDDLE EAST",
    "countries": [
      {
        "region": "MIDDLE EAST",
        "country": "Bahrain",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/bahrain",
        "cities": [
          {
            "name": "Manama",
            "url": "https://www.lonelyplanet.com/destinations/bahrain/manama"
          }
        ]
      },
      {
        "region": "MIDDLE EAST",
        "country": "Iran",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/iran",
        "cities": [
          {
            "name": "Esfahan",
            "url": "https://www.lonelyplanet.com/destinations/iran/central-iran/esfahan"
          },
          {
            "name": "Kish Island",
            "url": "https://www.lonelyplanet.com/destinations/iran/the-persian-gulf/kish-island"
          },
          {
            "name": "Tehran",
            "url": "https://www.lonelyplanet.com/destinations/iran/tehran"
          }
        ]
      },
      {
        "region": "MIDDLE EAST",
        "country": "Israel",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/israel",
        "cities": [
          {
            "name": "Dead Sea",
            "url": "https://www.lonelyplanet.com/destinations/israel-and-the-palestinian-territories/dead-sea"
          },
          {
            "name": "Golan Heights",
            "url": "https://www.lonelyplanet.com/destinations/israel/golan-heights"
          },
          {
            "name": "Haifa",
            "url": "https://www.lonelyplanet.com/destinations/israel-and-the-palestinian-territories/mediterranean-coast/haifa"
          },
          {
            "name": "Nazareth",
            "url": "https://www.lonelyplanet.com/destinations/israel-and-the-palestinian-territories/galilee/nazareth"
          },
          {
            "name": "North Coast",
            "url": "https://www.lonelyplanet.com/destinations/israel-and-the-palestinian-territories/mediterranean-coast"
          },
          {
            "name": "Tel Aviv",
            "url": "https://www.lonelyplanet.com/destinations/israel-and-the-palestinian-territories/mediterranean-coast/tel-aviv"
          }
        ]
      },
      {
        "region": "MIDDLE EAST",
        "country": "Jordan",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/jordan",
        "cities": [
          {
            "name": "Amman",
            "url": "https://www.lonelyplanet.com/destinations/jordan/amman"
          },
          {
            "name": "Aqaba",
            "url": "https://www.lonelyplanet.com/destinations/jordan/petra-and-the-south/aqaba"
          },
          {
            "name": "Dead Sea",
            "url": "https://www.lonelyplanet.com/destinations/jordan/the-dead-sea-and-around/the-dead-sea"
          },
          {
            "name": "Jerash",
            "url": "https://www.lonelyplanet.com/destinations/jordan/jerash-and-the-north/jerash"
          },
          {
            "name": "Madaba",
            "url": "https://www.lonelyplanet.com/destinations/jordan/kings-highway/madaba"
          },
          {
            "name": "Mt Nebo",
            "url": "https://www.lonelyplanet.com/destinations/jordan/mt-nebo"
          },
          {
            "name": "Petra",
            "url": "https://www.lonelyplanet.com/destinations/jordan/petra"
          },
          {
            "name": "Umm Qais",
            "url": "https://www.lonelyplanet.com/destinations/jordan/jerash-and-the-north/umm-qais"
          },
          {
            "name": "Wadi Mujib",
            "url": "https://www.lonelyplanet.com/destinations/jordan/wadi-mujib"
          },
          {
            "name": "Wadi Musa",
            "url": "https://www.lonelyplanet.com/destinations/jordan/petra-and-the-south/petra-and-wadi-musa"
          },
          {
            "name": "Wadi Rum",
            "url": "https://www.lonelyplanet.com/destinations/jordan/petra-and-the-south/wadi-rum"
          }
        ]
      },
      {
        "region": "MIDDLE EAST",
        "country": "Kuwait",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/kuwait",
        "cities": [
          {
            "name": "Kuwait City",
            "url": "https://www.lonelyplanet.com/destinations/kuwait/kuwait-city"
          }
        ]
      },
      {
        "region": "MIDDLE EAST",
        "country": "Lebanon",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/lebanon",
        "cities": [
          {
            "name": "Beirut",
            "url": "https://www.lonelyplanet.com/destinations/lebanon/beirut"
          }
        ]
      },
      {
        "region": "MIDDLE EAST",
        "country": "Oman",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/oman",
        "cities": [
          {
            "name": "Al Hamra",
            "url": "https://www.lonelyplanet.com/destinations/oman/al-hamra"
          },
          {
            "name": "Hajar Mountains",
            "url": "https://www.lonelyplanet.com/destinations/oman/al-dakhiliyah-region"
          },
          {
            "name": "Jebel Akhdar",
            "url": "https://www.lonelyplanet.com/destinations/oman/al-dakhiliyah-region/jebel-akhdar"
          },
          {
            "name": "Jebel Shams",
            "url": "https://www.lonelyplanet.com/destinations/oman/jebel-shams"
          },
          {
            "name": "Masirah Island",
            "url": "https://www.lonelyplanet.com/destinations/oman/sharqiya-region/masirah"
          },
          {
            "name": "Musandam",
            "url": "https://www.lonelyplanet.com/destinations/oman/musandam"
          },
          {
            "name": "Muscat",
            "url": "https://www.lonelyplanet.com/destinations/oman/muscat"
          },
          {
            "name": "Nizwa",
            "url": "https://www.lonelyplanet.com/destinations/oman/al-dakhiliyah-region/nizwa"
          },
          {
            "name": "Salalah",
            "url": "https://www.lonelyplanet.com/destinations/oman/dhofar/salalah"
          },
          {
            "name": "Sharqiya Sands",
            "url": "https://www.lonelyplanet.com/destinations/oman/sharqiya-region/sharqiya-wahiba-sands"
          }
        ]
      },
      {
        "region": "MIDDLE EAST",
        "country": "Palestinian Territories",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/palestinian-territories",
        "cities": [
          {
            "name": "West Bank",
            "url": "https://www.lonelyplanet.com/destinations/israel-and-the-palestinian-territories/the-west-bank-and-gaza-strip"
          }
        ]
      },
      {
        "region": "MIDDLE EAST",
        "country": "Qatar",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/qatar",
        "cities": [
          {
            "name": "Doha",
            "url": "https://www.lonelyplanet.com/destinations/qatar/doha"
          }
        ]
      },
      {
        "region": "MIDDLE EAST",
        "country": "Saudi Arabia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/saudi-arabia",
        "cities": [
          {
            "name": "Jeddah",
            "url": "https://www.lonelyplanet.com/destinations/saudi-arabia/hejaz/jeddah"
          },
          {
            "name": "Mecca",
            "url": "https://www.lonelyplanet.com/destinations/saudi-arabia/mecca"
          },
          {
            "name": "Northern Saudi Arabia",
            "url": "https://www.lonelyplanet.com/destinations/saudi-arabia/madain-saleh-and-the-north"
          },
          {
            "name": "Riyadh",
            "url": "https://www.lonelyplanet.com/destinations/saudi-arabia/riyadh"
          }
        ]
      },
      {
        "region": "MIDDLE EAST",
        "country": "United Arab Emirates",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/united-arab-emirates",
        "cities": [
          {
            "name": "Abu Dhabi",
            "url": "https://www.lonelyplanet.com/destinations/united-arab-emirates/abu-dhabi"
          },
          {
            "name": "Dubai",
            "url": "https://www.lonelyplanet.com/destinations/united-arab-emirates/dubai"
          },
          {
            "name": "Sharjah",
            "url": "https://www.lonelyplanet.com/destinations/united-arab-emirates/the-northern-emirates/sharjah"
          }
        ]
      }
    ]
  },
  {
    "region": "NORTH AMERICA",
    "countries": [
      {
        "region": "NORTH AMERICA",
        "country": "Canada",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/canada",
        "cities": [
          {
            "name": "Alberta",
            "url": "https://www.lonelyplanet.com/destinations/canada/alberta"
          },
          {
            "name": "Banff & Jasper National Parks",
            "url": "https://www.lonelyplanet.com/destinations/canada/alberta/banff-and-jasper-national-parks"
          },
          {
            "name": "Banff National Park",
            "url": "https://www.lonelyplanet.com/destinations/canada/banff-national-park"
          },
          {
            "name": "Banff Town",
            "url": "https://www.lonelyplanet.com/destinations/canada/alberta/banff-town"
          },
          {
            "name": "British Columbia",
            "url": "https://www.lonelyplanet.com/destinations/canada/british-columbia"
          },
          {
            "name": "British Columbia & The Canadian Rockies",
            "url": "https://www.lonelyplanet.com/destinations/canada/british-columbia-the-canadian-rockies"
          },
          {
            "name": "Calgary",
            "url": "https://www.lonelyplanet.com/destinations/canada/alberta/calgary"
          },
          {
            "name": "Cape Breton Island",
            "url": "https://www.lonelyplanet.com/destinations/canada/cape-breton-island"
          },
          {
            "name": "Churchill",
            "url": "https://www.lonelyplanet.com/destinations/canada/manitoba/churchill"
          },
          {
            "name": "Edmonton",
            "url": "https://www.lonelyplanet.com/destinations/canada/alberta/edmonton"
          },
          {
            "name": "Gaspé Peninsula",
            "url": "https://www.lonelyplanet.com/destinations/canada/gaspe-peninsula"
          },
          {
            "name": "Haida Gwaii",
            "url": "https://www.lonelyplanet.com/destinations/canada/british-columbia/queen-charlotte-islands-haida-gwaii"
          },
          {
            "name": "Halifax",
            "url": "https://www.lonelyplanet.com/destinations/canada/nova-scotia/halifax"
          },
          {
            "name": "Jasper National Park",
            "url": "https://www.lonelyplanet.com/destinations/canada/jasper-national-park"
          },
          {
            "name": "Kelowna",
            "url": "https://www.lonelyplanet.com/destinations/canada/british-columbia/kelowna"
          },
          {
            "name": "Kingston",
            "url": "https://www.lonelyplanet.com/destinations/canada/ontario/kingston"
          },
          {
            "name": "Lake Louise",
            "url": "https://www.lonelyplanet.com/destinations/canada/alberta/lake-louise"
          },
          {
            "name": "Manitoba",
            "url": "https://www.lonelyplanet.com/destinations/canada/manitoba"
          },
          {
            "name": "Montréal",
            "url": "https://www.lonelyplanet.com/destinations/canada/montreal"
          },
          {
            "name": "New Brunswick",
            "url": "https://www.lonelyplanet.com/destinations/canada/new-brunswick"
          },
          {
            "name": "Newfoundland & Labrador",
            "url": "https://www.lonelyplanet.com/destinations/canada/newfoundland-labrador"
          },
          {
            "name": "Niagara Falls",
            "url": "https://www.lonelyplanet.com/destinations/canada/ontario/niagara-falls"
          },
          {
            "name": "Nova Scotia",
            "url": "https://www.lonelyplanet.com/destinations/canada/nova-scotia"
          },
          {
            "name": "Nova Scotia, New Brunswick & Prince Edward Island",
            "url": "https://www.lonelyplanet.com/destinations/canada/nova-scotia-new-brunswick-prince-edward-island"
          },
          {
            "name": "Nunavut",
            "url": "https://www.lonelyplanet.com/destinations/canada/nunavut"
          },
          {
            "name": "Okanagan Valley",
            "url": "https://www.lonelyplanet.com/destinations/canada/british-columbia/okanagan-valley"
          },
          {
            "name": "Ontario",
            "url": "https://www.lonelyplanet.com/destinations/canada/ontario"
          },
          {
            "name": "Ottawa",
            "url": "https://www.lonelyplanet.com/destinations/canada/ontario/ottawa"
          },
          {
            "name": "Prince Edward Island",
            "url": "https://www.lonelyplanet.com/destinations/canada/prince-edward-island"
          },
          {
            "name": "Québec",
            "url": "https://www.lonelyplanet.com/destinations/canada/quebec"
          },
          {
            "name": "Québec City",
            "url": "https://www.lonelyplanet.com/destinations/canada/quebec-city"
          },
          {
            "name": "Saint John",
            "url": "https://www.lonelyplanet.com/destinations/canada/new-brunswick/saint-john"
          },
          {
            "name": "Saskatchewan",
            "url": "https://www.lonelyplanet.com/destinations/canada/saskatchewan"
          },
          {
            "name": "St John's",
            "url": "https://www.lonelyplanet.com/destinations/canada/newfoundland-and-labrador/st-johns"
          },
          {
            "name": "The Laurentians",
            "url": "https://www.lonelyplanet.com/destinations/canada/quebec/the-laurentians"
          },
          {
            "name": "Thousand Islands",
            "url": "https://www.lonelyplanet.com/destinations/canada/thousand-islands"
          },
          {
            "name": "Tofino",
            "url": "https://www.lonelyplanet.com/destinations/canada/british-columbia/tofino-and-around"
          },
          {
            "name": "Toronto",
            "url": "https://www.lonelyplanet.com/destinations/canada/toronto"
          },
          {
            "name": "Vancouver",
            "url": "https://www.lonelyplanet.com/destinations/canada/vancouver"
          },
          {
            "name": "Vancouver Island",
            "url": "https://www.lonelyplanet.com/destinations/canada/british-columbia/vancouver-island"
          },
          {
            "name": "Whistler",
            "url": "https://www.lonelyplanet.com/destinations/canada/british-columbia/whistler"
          },
          {
            "name": "Whitehorse",
            "url": "https://www.lonelyplanet.com/destinations/canada/yukon-territory/whitehorse"
          },
          {
            "name": "Winnipeg",
            "url": "https://www.lonelyplanet.com/destinations/canada/manitoba/winnipeg"
          },
          {
            "name": "Yellowknife",
            "url": "https://www.lonelyplanet.com/destinations/canada/northwest-territories/yellowknife"
          },
          {
            "name": "Yukon Territory",
            "url": "https://www.lonelyplanet.com/destinations/canada/yukon-territory"
          }
        ]
      },
      {
        "region": "NORTH AMERICA",
        "country": "Mexico",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/mexico",
        "cities": [
          {
            "name": "Acapulco",
            "url": "https://www.lonelyplanet.com/destinations/mexico/central-pacific-coast/acapulco"
          },
          {
            "name": "Akumal",
            "url": "https://www.lonelyplanet.com/destinations/mexico/akumal"
          },
          {
            "name": "Around Mexico City",
            "url": "https://www.lonelyplanet.com/destinations/mexico/around-mexico-city"
          },
          {
            "name": "Bahías de Huatulco",
            "url": "https://www.lonelyplanet.com/destinations/mexico/oaxaca-state/bahias-de-huatulco"
          },
          {
            "name": "Baja California",
            "url": "https://www.lonelyplanet.com/destinations/mexico/baja-california"
          },
          {
            "name": "Barra de la Cruz",
            "url": "https://www.lonelyplanet.com/destinations/mexico/oaxaca-state/barra-de-la-cruz"
          },
          {
            "name": "Cabo Pulmo",
            "url": "https://www.lonelyplanet.com/destinations/mexico/cabo-pulmo"
          },
          {
            "name": "Cabo San Lucas",
            "url": "https://www.lonelyplanet.com/destinations/mexico/baja-california/cabo-san-lucas"
          },
          {
            "name": "Campeche",
            "url": "https://www.lonelyplanet.com/destinations/mexico/yucatan-peninsula/campeche"
          },
          {
            "name": "Cancún",
            "url": "https://www.lonelyplanet.com/destinations/mexico/cancun"
          },
          {
            "name": "Celestún",
            "url": "https://www.lonelyplanet.com/destinations/mexico/yucatan-peninsula/celestun"
          },
          {
            "name": "Central Pacific Coast",
            "url": "https://www.lonelyplanet.com/destinations/mexico/central-pacific-coast"
          },
          {
            "name": "Chetumal",
            "url": "https://www.lonelyplanet.com/destinations/mexico/yucatan-peninsula/chetumal"
          },
          {
            "name": "Chiapas",
            "url": "https://www.lonelyplanet.com/destinations/mexico/tabasco-and-chiapas"
          },
          {
            "name": "Chichén Itzá",
            "url": "https://www.lonelyplanet.com/destinations/mexico/yucatan-peninsula/chichen-itza"
          },
          {
            "name": "Cobá",
            "url": "https://www.lonelyplanet.com/destinations/mexico/yucatan-peninsula/coba"
          },
          {
            "name": "Copper Canyon & Northern Mexico",
            "url": "https://www.lonelyplanet.com/destinations/mexico/copper-canyon-northern-mexico"
          },
          {
            "name": "Costa Maya & Southern Caribbean Coast",
            "url": "https://www.lonelyplanet.com/destinations/mexico/yucatan-peninsula/the-costa-maya"
          },
          {
            "name": "Cuernavaca",
            "url": "https://www.lonelyplanet.com/destinations/mexico/south-of-mexico-city/cuernavaca"
          },
          {
            "name": "Ensenada",
            "url": "https://www.lonelyplanet.com/destinations/mexico/baja-california/ensenada"
          },
          {
            "name": "Guadalajara",
            "url": "https://www.lonelyplanet.com/destinations/mexico/western-central-highlands/guadalajara"
          },
          {
            "name": "Guanajuato",
            "url": "https://www.lonelyplanet.com/destinations/mexico/northern-central-highlands/guanajuato"
          },
          {
            "name": "Isla Cozumel",
            "url": "https://www.lonelyplanet.com/destinations/mexico/isla-cozumel"
          },
          {
            "name": "Isla Holbox",
            "url": "https://www.lonelyplanet.com/destinations/mexico/yucatan-peninsula/isla-holbox"
          },
          {
            "name": "Isla Mujeres",
            "url": "https://www.lonelyplanet.com/destinations/mexico/yucatan-peninsula/isla-mujeres"
          },
          {
            "name": "Ixtapa",
            "url": "https://www.lonelyplanet.com/destinations/mexico/central-pacific-coast/ixtapa"
          },
          {
            "name": "Laguna Bacalar",
            "url": "https://www.lonelyplanet.com/destinations/mexico/yucatan-peninsula/laguna-bacalar"
          },
          {
            "name": "La Huasteca Potosina",
            "url": "https://www.lonelyplanet.com/destinations/mexico/la-huasteca-potosina"
          },
          {
            "name": "La Paz",
            "url": "https://www.lonelyplanet.com/destinations/mexico/baja-california/la-paz"
          },
          {
            "name": "Loreto",
            "url": "https://www.lonelyplanet.com/destinations/mexico/baja-california/loreto"
          },
          {
            "name": "Manzanillo",
            "url": "https://www.lonelyplanet.com/destinations/mexico/central-pacific-coast/manzanillo"
          },
          {
            "name": "Mazatlán",
            "url": "https://www.lonelyplanet.com/destinations/mexico/central-pacific-coast/mazatlan"
          },
          {
            "name": "Mazunte",
            "url": "https://www.lonelyplanet.com/destinations/mexico/oaxaca-state/mazunte"
          },
          {
            "name": "Mérida",
            "url": "https://www.lonelyplanet.com/destinations/mexico/yucatan-peninsula/merida"
          },
          {
            "name": "Mexico City",
            "url": "https://www.lonelyplanet.com/destinations/mexico/mexico-city"
          },
          {
            "name": "Monterrey",
            "url": "https://www.lonelyplanet.com/destinations/mexico/northeast-mexico/monterrey"
          },
          {
            "name": "Morelia",
            "url": "https://www.lonelyplanet.com/destinations/mexico/western-central-highlands/morelia"
          },
          {
            "name": "Mulegé",
            "url": "https://www.lonelyplanet.com/destinations/mexico/baja-california/mulege"
          },
          {
            "name": "Northern Central Highlands",
            "url": "https://www.lonelyplanet.com/destinations/mexico/northern-central-highlands"
          },
          {
            "name": "Oaxaca",
            "url": "https://www.lonelyplanet.com/destinations/mexico/oaxaca-state"
          },
          {
            "name": "Oaxaca City",
            "url": "https://www.lonelyplanet.com/destinations/mexico/oaxaca-state/oaxaca"
          },
          {
            "name": "Oaxaca Coast",
            "url": "https://www.lonelyplanet.com/destinations/mexico/oaxaca-state/oaxaca-coast"
          },
          {
            "name": "Palenque",
            "url": "https://www.lonelyplanet.com/destinations/mexico/tabasco-and-chiapas/palenque"
          },
          {
            "name": "Parque Nacional Lagunas de Chacahua",
            "url": "https://www.lonelyplanet.com/destinations/mexico/oaxaca-state/parque-nacional-lagunas-de-chacahua"
          },
          {
            "name": "Playa del Carmen",
            "url": "https://www.lonelyplanet.com/destinations/mexico/yucatan-peninsula/playa-del-carmen"
          },
          {
            "name": "Progreso",
            "url": "https://www.lonelyplanet.com/destinations/mexico/yucatan-peninsula/progreso"
          },
          {
            "name": "Puebla",
            "url": "https://www.lonelyplanet.com/destinations/mexico/east-of-mexico-city/puebla"
          },
          {
            "name": "Pueblos Mancomunados",
            "url": "https://www.lonelyplanet.com/destinations/mexico/oaxaca-state/pueblos-mancomunados"
          },
          {
            "name": "Puerto Ángel",
            "url": "https://www.lonelyplanet.com/destinations/mexico/oaxaca-state/puerto-angel"
          },
          {
            "name": "Puerto Escondido",
            "url": "https://www.lonelyplanet.com/destinations/mexico/oaxaca-state/puerto-escondido"
          },
          {
            "name": "Puerto Morelos",
            "url": "https://www.lonelyplanet.com/destinations/mexico/yucatan-peninsula/puerto-morelos"
          },
          {
            "name": "Puerto Vallarta",
            "url": "https://www.lonelyplanet.com/destinations/mexico/puerto-vallarta"
          },
          {
            "name": "Querétaro",
            "url": "https://www.lonelyplanet.com/destinations/mexico/northern-central-highlands/queretaro"
          },
          {
            "name": "Quintana Roo",
            "url": "https://www.lonelyplanet.com/destinations/mexico/quintana-roo"
          },
          {
            "name": "Riviera Maya",
            "url": "https://www.lonelyplanet.com/destinations/mexico/riviera-maya"
          },
          {
            "name": "San Agustinillo",
            "url": "https://www.lonelyplanet.com/destinations/mexico/oaxaca-state/san-agustinillo"
          },
          {
            "name": "San Cristóbal de las Casas",
            "url": "https://www.lonelyplanet.com/destinations/mexico/tabasco-and-chiapas/san-cristobal-de-las-casas"
          },
          {
            "name": "San José del Cabo",
            "url": "https://www.lonelyplanet.com/destinations/mexico/baja-california/san-jose-del-cabo"
          },
          {
            "name": "San Miguel de Allende",
            "url": "https://www.lonelyplanet.com/destinations/mexico/northern-central-highlands/san-miguel-de-allende"
          },
          {
            "name": "San Patricio-Melaque",
            "url": "https://www.lonelyplanet.com/destinations/mexico/central-pacific-coast/san-patricio-melaque"
          },
          {
            "name": "Sayulita",
            "url": "https://www.lonelyplanet.com/destinations/mexico/central-pacific-coast/sayulita"
          },
          {
            "name": "Sonora",
            "url": "https://www.lonelyplanet.com/destinations/mexico/northwest-mexico/sonora"
          },
          {
            "name": "Southern Baja",
            "url": "https://www.lonelyplanet.com/destinations/mexico/baja-california/southern-baja"
          },
          {
            "name": "South of Mexico City",
            "url": "https://www.lonelyplanet.com/destinations/mexico/south-of-mexico-city"
          },
          {
            "name": "Tabasco",
            "url": "https://www.lonelyplanet.com/destinations/mexico/tabasco-and-chiapas/tabasco"
          },
          {
            "name": "Taxco",
            "url": "https://www.lonelyplanet.com/destinations/mexico/south-of-mexico-city/taxco"
          },
          {
            "name": "Teotihuacán",
            "url": "https://www.lonelyplanet.com/destinations/mexico/north-of-mexico-city/teotihuacan"
          },
          {
            "name": "Teotitlán del Valle",
            "url": "https://www.lonelyplanet.com/destinations/mexico/oaxaca-state/teotitlan-del-valle"
          },
          {
            "name": "Tepoztlán",
            "url": "https://www.lonelyplanet.com/destinations/mexico/south-of-mexico-city/tepoztlan"
          },
          {
            "name": "The Copper Canyon & Ferrocarril Chihuahua Pacífico",
            "url": "https://www.lonelyplanet.com/destinations/mexico/the-copper-canyon-ferrocarril-chihuahua-pacifico"
          },
          {
            "name": "Tijuana",
            "url": "https://www.lonelyplanet.com/destinations/mexico/baja-california/tijuana"
          },
          {
            "name": "Todos Santos",
            "url": "https://www.lonelyplanet.com/destinations/mexico/baja-california/todos-santos"
          },
          {
            "name": "Troncones",
            "url": "https://www.lonelyplanet.com/destinations/mexico/central-pacific-coast/troncones-and-majahua"
          },
          {
            "name": "Tulum",
            "url": "https://www.lonelyplanet.com/destinations/mexico/yucatan-peninsula/tulum"
          },
          {
            "name": "Valladolid",
            "url": "https://www.lonelyplanet.com/destinations/mexico/yucatan-peninsula/valladolid"
          },
          {
            "name": "Veracruz",
            "url": "https://www.lonelyplanet.com/destinations/mexico/central-gulf-coast"
          },
          {
            "name": "Veracruz City",
            "url": "https://www.lonelyplanet.com/destinations/mexico/central-gulf-coast/veracruz"
          },
          {
            "name": "Xalapa",
            "url": "https://www.lonelyplanet.com/destinations/mexico/central-gulf-coast/xalapa"
          },
          {
            "name": "Yucatán Peninsula",
            "url": "https://www.lonelyplanet.com/destinations/mexico/yucatan-peninsula"
          },
          {
            "name": "Zacatecas",
            "url": "https://www.lonelyplanet.com/destinations/mexico/northern-central-highlands/zacatecas"
          },
          {
            "name": "Zihuatanejo",
            "url": "https://www.lonelyplanet.com/destinations/mexico/central-pacific-coast/zihuatanejo"
          },
          {
            "name": "Zipolite",
            "url": "https://www.lonelyplanet.com/destinations/mexico/oaxaca-state/zipolite"
          }
        ]
      },
      {
        "region": "NORTH AMERICA",
        "country": "The USA",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/usa",
        "cities": [
          {
            "name": "Acadia National Park",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-england/acadia-national-park"
          },
          {
            "name": "Alabama",
            "url": "https://www.lonelyplanet.com/destinations/usa/the-south/alabama"
          },
          {
            "name": "Alaska",
            "url": "https://www.lonelyplanet.com/destinations/usa/alaska"
          },
          {
            "name": "Albuquerque",
            "url": "https://www.lonelyplanet.com/destinations/usa/southwest/albuquerque"
          },
          {
            "name": "Aleutian Islands",
            "url": "https://www.lonelyplanet.com/destinations/usa/alaska/aleutian-islands"
          },
          {
            "name": "Alexandria",
            "url": "https://www.lonelyplanet.com/destinations/usa/virginia/alexandria"
          },
          {
            "name": "Anchorage",
            "url": "https://www.lonelyplanet.com/destinations/usa/alaska/anchorage"
          },
          {
            "name": "Arizona",
            "url": "https://www.lonelyplanet.com/destinations/usa/southwest/arizona"
          },
          {
            "name": "Arkansas",
            "url": "https://www.lonelyplanet.com/destinations/usa/the-south/arkansas"
          },
          {
            "name": "Asheville",
            "url": "https://www.lonelyplanet.com/destinations/usa/the-south/asheville"
          },
          {
            "name": "Aspen",
            "url": "https://www.lonelyplanet.com/destinations/usa/rocky-mountains/aspen"
          },
          {
            "name": "Atlanta",
            "url": "https://www.lonelyplanet.com/destinations/usa/the-south/atlanta"
          },
          {
            "name": "Austin",
            "url": "https://www.lonelyplanet.com/destinations/usa/austin"
          },
          {
            "name": "Baltimore",
            "url": "https://www.lonelyplanet.com/destinations/usa/maryland/baltimore"
          },
          {
            "name": "Bend",
            "url": "https://www.lonelyplanet.com/destinations/usa/oregon/bend"
          },
          {
            "name": "Berkeley",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/berkeley"
          },
          {
            "name": "Big Sur",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/big-sur"
          },
          {
            "name": "Birmingham",
            "url": "https://www.lonelyplanet.com/destinations/usa/the-south/birmingham"
          },
          {
            "name": "Boise",
            "url": "https://www.lonelyplanet.com/destinations/usa/rocky-mountains/boise"
          },
          {
            "name": "Boston",
            "url": "https://www.lonelyplanet.com/destinations/usa/boston"
          },
          {
            "name": "Boulder",
            "url": "https://www.lonelyplanet.com/destinations/usa/rocky-mountains/boulder"
          },
          {
            "name": "Bozeman & Gallatin Valley",
            "url": "https://www.lonelyplanet.com/destinations/usa/rocky-mountains/bozeman"
          },
          {
            "name": "Bryce Canyon National Park",
            "url": "https://www.lonelyplanet.com/destinations/usa/southwest/bryce-canyon-national-park"
          },
          {
            "name": "Buffalo",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-york-state/buffalo"
          },
          {
            "name": "Burlington",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-england/burlington"
          },
          {
            "name": "California",
            "url": "https://www.lonelyplanet.com/destinations/usa/california"
          },
          {
            "name": "Cape Cod",
            "url": "https://www.lonelyplanet.com/destinations/usa/cape-cod"
          },
          {
            "name": "Catskills",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-york-state/catskills"
          },
          {
            "name": "Charleston",
            "url": "https://www.lonelyplanet.com/destinations/usa/the-south/charleston"
          },
          {
            "name": "Charlotte",
            "url": "https://www.lonelyplanet.com/destinations/usa/the-south/charlotte"
          },
          {
            "name": "Chattanooga",
            "url": "https://www.lonelyplanet.com/destinations/usa/the-south/chattanooga"
          },
          {
            "name": "Chicago",
            "url": "https://www.lonelyplanet.com/destinations/usa/chicago"
          },
          {
            "name": "Cincinnati",
            "url": "https://www.lonelyplanet.com/destinations/usa/great-lakes/cincinnati"
          },
          {
            "name": "Cleveland",
            "url": "https://www.lonelyplanet.com/destinations/usa/great-lakes/cleveland"
          },
          {
            "name": "Colorado",
            "url": "https://www.lonelyplanet.com/destinations/usa/rocky-mountains/colorado"
          },
          {
            "name": "Colorado Springs",
            "url": "https://www.lonelyplanet.com/destinations/usa/rocky-mountains/colorado-springs"
          },
          {
            "name": "Columbia River Gorge",
            "url": "https://www.lonelyplanet.com/destinations/usa/oregon/columbia-river-gorge"
          },
          {
            "name": "Connecticut",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-england/connecticut"
          },
          {
            "name": "Dallas",
            "url": "https://www.lonelyplanet.com/destinations/usa/texas/dallas"
          },
          {
            "name": "Death Valley National Park",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/death-valley-national-park"
          },
          {
            "name": "Delaware",
            "url": "https://www.lonelyplanet.com/destinations/usa/delaware"
          },
          {
            "name": "Denali National Park & Preserve",
            "url": "https://www.lonelyplanet.com/destinations/usa/alaska/denali-national-park"
          },
          {
            "name": "Denver",
            "url": "https://www.lonelyplanet.com/destinations/usa/rocky-mountains/denver"
          },
          {
            "name": "Detroit",
            "url": "https://www.lonelyplanet.com/destinations/usa/great-lakes/detroit"
          },
          {
            "name": "Eastern USA",
            "url": "https://www.lonelyplanet.com/destinations/usa/eastern-usa"
          },
          {
            "name": "El Paso",
            "url": "https://www.lonelyplanet.com/destinations/usa/texas/el-paso"
          },
          {
            "name": "Everglades National Park",
            "url": "https://www.lonelyplanet.com/destinations/usa/florida/everglades-national-park"
          },
          {
            "name": "Fairbanks",
            "url": "https://www.lonelyplanet.com/destinations/usa/alaska/fairbanks"
          },
          {
            "name": "Finger Lakes",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-york/finger-lakes"
          },
          {
            "name": "Flagstaff",
            "url": "https://www.lonelyplanet.com/destinations/usa/southwest/flagstaff"
          },
          {
            "name": "Florida",
            "url": "https://www.lonelyplanet.com/destinations/usa/florida"
          },
          {
            "name": "Florida Keys",
            "url": "https://www.lonelyplanet.com/destinations/usa/florida/florida-keys"
          },
          {
            "name": "Fort Lauderdale",
            "url": "https://www.lonelyplanet.com/destinations/usa/florida/fort-lauderdale"
          },
          {
            "name": "Fort Worth",
            "url": "https://www.lonelyplanet.com/destinations/usa/texas/fort-worth"
          },
          {
            "name": "Georgia",
            "url": "https://www.lonelyplanet.com/destinations/usa/the-south/georgia"
          },
          {
            "name": "Glacier National Park",
            "url": "https://www.lonelyplanet.com/destinations/usa/rocky-mountains/glacier-national-park"
          },
          {
            "name": "Gold Coast",
            "url": "https://www.lonelyplanet.com/destinations/usa/michigan/gold-coast"
          },
          {
            "name": "Grand Canyon National Park",
            "url": "https://www.lonelyplanet.com/destinations/usa/arizona/grand-canyon-national-park"
          },
          {
            "name": "Grand Canyon National Park South Rim",
            "url": "https://www.lonelyplanet.com/destinations/usa/southwest/south-rim"
          },
          {
            "name": "Grand Canyon Region",
            "url": "https://www.lonelyplanet.com/destinations/usa/grand-canyon-national-park"
          },
          {
            "name": "Grand Teton National Park",
            "url": "https://www.lonelyplanet.com/destinations/usa/rocky-mountains/grand-teton-national-park"
          },
          {
            "name": "Greater Palm Springs",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/palm-springs-and-coachella-valley"
          },
          {
            "name": "Greater Phoenix",
            "url": "https://www.lonelyplanet.com/destinations/usa/southwest/phoenix"
          },
          {
            "name": "Great Smoky Mountains National Park",
            "url": "https://www.lonelyplanet.com/destinations/usa/the-south/north-carolina/great-smoky-mountains-national-park"
          },
          {
            "name": "Haleakalā National Park",
            "url": "https://www.lonelyplanet.com/destinations/usa/hawaii/haleakala-national-park"
          },
          {
            "name": "Hanalei",
            "url": "https://www.lonelyplanet.com/destinations/usa/hawaii/hanalei"
          },
          {
            "name": "Hawaii",
            "url": "https://www.lonelyplanet.com/destinations/usa/hawaii"
          },
          {
            "name": "Hawaiʻi the Big Island",
            "url": "https://www.lonelyplanet.com/destinations/usa/hawaii/hawaii-the-big-island"
          },
          {
            "name": "Hawaiʻi Volcanoes National Park",
            "url": "https://www.lonelyplanet.com/destinations/usa/hawaii/hawai-i-volcanoes-national-park"
          },
          {
            "name": "Hilo",
            "url": "https://www.lonelyplanet.com/destinations/usa/hawaii/hilo"
          },
          {
            "name": "Honolulu",
            "url": "https://www.lonelyplanet.com/destinations/usa/honolulu-and-waikiki"
          },
          {
            "name": "Houston",
            "url": "https://www.lonelyplanet.com/destinations/usa/texas/houston"
          },
          {
            "name": "Hudson Valley",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-york/hudson-valley"
          },
          {
            "name": "Idaho",
            "url": "https://www.lonelyplanet.com/destinations/usa/rocky-mountains/idaho"
          },
          {
            "name": "Illinois",
            "url": "https://www.lonelyplanet.com/destinations/usa/great-lakes/illinois"
          },
          {
            "name": "Indiana",
            "url": "https://www.lonelyplanet.com/destinations/usa/great-lakes/indiana"
          },
          {
            "name": "Indianapolis",
            "url": "https://www.lonelyplanet.com/destinations/usa/great-lakes/indianapolis"
          },
          {
            "name": "Iowa",
            "url": "https://www.lonelyplanet.com/destinations/usa/great-plains/iowa"
          },
          {
            "name": "Joshua Tree National Park",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/joshua-tree-national-park"
          },
          {
            "name": "Juneau",
            "url": "https://www.lonelyplanet.com/destinations/usa/alaska/juneau"
          },
          {
            "name": "Kailua",
            "url": "https://www.lonelyplanet.com/destinations/usa/hawaii/kailua"
          },
          {
            "name": "Kailua-Kona",
            "url": "https://www.lonelyplanet.com/destinations/usa/hawaii/kailua-kona"
          },
          {
            "name": "Kansas",
            "url": "https://www.lonelyplanet.com/destinations/usa/kansas"
          },
          {
            "name": "Kansas City",
            "url": "https://www.lonelyplanet.com/destinations/usa/great-plains/kansas-city"
          },
          {
            "name": "Kauaʻi",
            "url": "https://www.lonelyplanet.com/destinations/usa/hawaii/kauai"
          },
          {
            "name": "Kentucky",
            "url": "https://www.lonelyplanet.com/destinations/usa/the-south/kentucky"
          },
          {
            "name": "Ketchikan",
            "url": "https://www.lonelyplanet.com/destinations/usa/alaska/ketchikan"
          },
          {
            "name": "Key West",
            "url": "https://www.lonelyplanet.com/destinations/usa/florida/key-west"
          },
          {
            "name": "Kings Canyon National Park",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/kings-canyon-national-park-1338956"
          },
          {
            "name": "Kona Coast",
            "url": "https://www.lonelyplanet.com/destinations/usa/hawaii/kona-coast"
          },
          {
            "name": "Lahaina",
            "url": "https://www.lonelyplanet.com/destinations/usa/hawaii/lahaina"
          },
          {
            "name": "Lake Tahoe",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/lake-tahoe"
          },
          {
            "name": "Las Vegas",
            "url": "https://www.lonelyplanet.com/destinations/usa/las-vegas"
          },
          {
            "name": "Long Island",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-york-state/long-island"
          },
          {
            "name": "Los Angeles",
            "url": "https://www.lonelyplanet.com/destinations/usa/los-angeles"
          },
          {
            "name": "Louisiana",
            "url": "https://www.lonelyplanet.com/destinations/usa/the-south/louisiana"
          },
          {
            "name": "Louisville",
            "url": "https://www.lonelyplanet.com/destinations/usa/the-south/louisville"
          },
          {
            "name": "Maine",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-england/maine"
          },
          {
            "name": "Mammoth Cave National Park",
            "url": "https://www.lonelyplanet.com/destinations/usa/kentucky/mammoth-cave-national-park"
          },
          {
            "name": "Mammoth Lakes",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/mammoth-lakes"
          },
          {
            "name": "Maryland",
            "url": "https://www.lonelyplanet.com/destinations/usa/maryland"
          },
          {
            "name": "Massachusetts",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-england/massachusetts"
          },
          {
            "name": "Maui",
            "url": "https://www.lonelyplanet.com/destinations/usa/hawaii/maui"
          },
          {
            "name": "Maunakea",
            "url": "https://www.lonelyplanet.com/destinations/usa/hawaii/mauna-kea"
          },
          {
            "name": "Memphis",
            "url": "https://www.lonelyplanet.com/destinations/usa/memphis"
          },
          {
            "name": "Miami",
            "url": "https://www.lonelyplanet.com/destinations/usa/miami"
          },
          {
            "name": "Michigan",
            "url": "https://www.lonelyplanet.com/destinations/usa/great-lakes/michigan"
          },
          {
            "name": "Mid-Atlantic States",
            "url": "https://www.lonelyplanet.com/destinations/usa/mid-atlantic-states"
          },
          {
            "name": "Midcoast Maine",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-england/central-maine-coast"
          },
          {
            "name": "Milwaukee",
            "url": "https://www.lonelyplanet.com/destinations/usa/wisconsin/milwaukee"
          },
          {
            "name": "Minneapolis",
            "url": "https://www.lonelyplanet.com/destinations/usa/great-lakes/minneapolis"
          },
          {
            "name": "Minnesota",
            "url": "https://www.lonelyplanet.com/destinations/usa/great-lakes/minnesota"
          },
          {
            "name": "Mississippi",
            "url": "https://www.lonelyplanet.com/destinations/usa/the-south/mississippi"
          },
          {
            "name": "Missouri",
            "url": "https://www.lonelyplanet.com/destinations/usa/great-plains/missouri"
          },
          {
            "name": "Moab",
            "url": "https://www.lonelyplanet.com/destinations/usa/southwest/moab"
          },
          {
            "name": "Moloka'i",
            "url": "https://www.lonelyplanet.com/destinations/usa/hawaii/moloka-i"
          },
          {
            "name": "Montana",
            "url": "https://www.lonelyplanet.com/destinations/usa/rocky-mountains/montana"
          },
          {
            "name": "Monterey",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/monterey"
          },
          {
            "name": "Monument Valley Navajo Tribal Park",
            "url": "https://www.lonelyplanet.com/destinations/usa/arizona/monument-valley-navajo-tribal-park"
          },
          {
            "name": "Napa",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/napa"
          },
          {
            "name": "Napa Valley",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/napa-valley"
          },
          {
            "name": "Naples",
            "url": "https://www.lonelyplanet.com/destinations/usa/florida/naples"
          },
          {
            "name": "Nashville",
            "url": "https://www.lonelyplanet.com/destinations/usa/nashville"
          },
          {
            "name": "Nebraska",
            "url": "https://www.lonelyplanet.com/destinations/usa/great-plains/nebraska"
          },
          {
            "name": "Nevada",
            "url": "https://www.lonelyplanet.com/destinations/usa/southwest/nevada"
          },
          {
            "name": "New England",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-england"
          },
          {
            "name": "New Hampshire",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-england/new-hampshire"
          },
          {
            "name": "New Haven",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-england/new-haven"
          },
          {
            "name": "New Jersey",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-jersey"
          },
          {
            "name": "New Mexico",
            "url": "https://www.lonelyplanet.com/destinations/usa/southwest/new-mexico"
          },
          {
            "name": "New Orleans",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-orleans"
          },
          {
            "name": "Newport",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-england/newport"
          },
          {
            "name": "New River Gorge National Park and Preserve",
            "url": "https://www.lonelyplanet.com/destinations/usa/west-virginia/new-river-gorge-national-park"
          },
          {
            "name": "New York",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-york-state"
          },
          {
            "name": "New York City",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-york-city"
          },
          {
            "name": "North Carolina",
            "url": "https://www.lonelyplanet.com/destinations/usa/the-south/north-carolina"
          },
          {
            "name": "North Coast & Redwoods",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/north-coast"
          },
          {
            "name": "North Dakota",
            "url": "https://www.lonelyplanet.com/destinations/usa/great-plains/north-dakota"
          },
          {
            "name": "Northern California",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/northern-california"
          },
          {
            "name": "Northern Oregon Coast",
            "url": "https://www.lonelyplanet.com/destinations/usa/oregon/northern-oregon-coast"
          },
          {
            "name": "Oʻahu",
            "url": "https://www.lonelyplanet.com/destinations/usa/hawaii/oahu"
          },
          {
            "name": "Oakland",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/oakland"
          },
          {
            "name": "Ohio",
            "url": "https://www.lonelyplanet.com/destinations/usa/great-lakes/ohio"
          },
          {
            "name": "Oklahoma",
            "url": "https://www.lonelyplanet.com/destinations/usa/great-plains/oklahoma"
          },
          {
            "name": "Olympic National Park",
            "url": "https://www.lonelyplanet.com/destinations/usa/pacific-northwest/olympic-national-park"
          },
          {
            "name": "Orange County",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/orange-county-1337451"
          },
          {
            "name": "Oregon",
            "url": "https://www.lonelyplanet.com/destinations/usa/pacific-northwest/oregon"
          },
          {
            "name": "Oregon Coast",
            "url": "https://www.lonelyplanet.com/destinations/usa/oregon/oregon-coast"
          },
          {
            "name": "Orlando",
            "url": "https://www.lonelyplanet.com/destinations/usa/florida/orlando"
          },
          {
            "name": "Outer Banks",
            "url": "https://www.lonelyplanet.com/destinations/usa/the-south/outer-banks"
          },
          {
            "name": "Park City",
            "url": "https://www.lonelyplanet.com/destinations/usa/southwest/park-city"
          },
          {
            "name": "Pennsylvania",
            "url": "https://www.lonelyplanet.com/destinations/usa/pennsylvania"
          },
          {
            "name": "Philadelphia",
            "url": "https://www.lonelyplanet.com/destinations/usa/pennsylvania/philadelphia"
          },
          {
            "name": "Pittsburgh",
            "url": "https://www.lonelyplanet.com/destinations/usa/pennsylvania/pittsburgh"
          },
          {
            "name": "Portland",
            "url": "https://www.lonelyplanet.com/destinations/usa/pacific-northwest/portland"
          },
          {
            "name": "Portland",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-england/portland"
          },
          {
            "name": "Providence",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-england/providence"
          },
          {
            "name": "Reno",
            "url": "https://www.lonelyplanet.com/destinations/usa/southwest/reno"
          },
          {
            "name": "Rhode Island",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-england/rhode-island"
          },
          {
            "name": "Richmond",
            "url": "https://www.lonelyplanet.com/destinations/usa/virginia/richmond"
          },
          {
            "name": "Sacramento",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/sacramento"
          },
          {
            "name": "Saguaro National Park",
            "url": "https://www.lonelyplanet.com/destinations/usa/arizona/saguaro-national-park"
          },
          {
            "name": "Salt Lake City",
            "url": "https://www.lonelyplanet.com/destinations/usa/southwest/salt-lake-city"
          },
          {
            "name": "San Antonio",
            "url": "https://www.lonelyplanet.com/destinations/usa/texas/san-antonio"
          },
          {
            "name": "San Diego",
            "url": "https://www.lonelyplanet.com/destinations/usa/san-diego"
          },
          {
            "name": "San Francisco",
            "url": "https://www.lonelyplanet.com/destinations/usa/san-francisco"
          },
          {
            "name": "San Jose",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/san-jose"
          },
          {
            "name": "San Juan Islands",
            "url": "https://www.lonelyplanet.com/destinations/usa/washington/san-juan-islands"
          },
          {
            "name": "Santa Barbara",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/santa-barbara"
          },
          {
            "name": "Santa Cruz",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/santa-cruz"
          },
          {
            "name": "Santa Fe",
            "url": "https://www.lonelyplanet.com/destinations/usa/santa-fe"
          },
          {
            "name": "Sausalito",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/sausalito"
          },
          {
            "name": "Savannah",
            "url": "https://www.lonelyplanet.com/destinations/usa/the-south/savannah"
          },
          {
            "name": "Seattle",
            "url": "https://www.lonelyplanet.com/destinations/usa/seattle"
          },
          {
            "name": "Sedona",
            "url": "https://www.lonelyplanet.com/destinations/usa/southwest/sedona"
          },
          {
            "name": "Sequoia & Kings Canyon National Parks",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/sequoia-kings-canyon-national-parks"
          },
          {
            "name": "Sequoia National Park",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/sequoia-national-park-1338957"
          },
          {
            "name": "Seward",
            "url": "https://www.lonelyplanet.com/destinations/usa/alaska/seward"
          },
          {
            "name": "South Carolina",
            "url": "https://www.lonelyplanet.com/destinations/usa/the-south/south-carolina"
          },
          {
            "name": "South Dakota",
            "url": "https://www.lonelyplanet.com/destinations/usa/great-plains/south-dakota"
          },
          {
            "name": "Southern California",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/southern-california"
          },
          {
            "name": "Southern USA",
            "url": "https://www.lonelyplanet.com/destinations/usa/the-south"
          },
          {
            "name": "South Lake Tahoe & Stateline",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/south-lake-tahoe-and-stateline"
          },
          {
            "name": "South Shore",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-england/south-shore"
          },
          {
            "name": "St Augustine",
            "url": "https://www.lonelyplanet.com/destinations/usa/florida/st-augustine"
          },
          {
            "name": "St Louis",
            "url": "https://www.lonelyplanet.com/destinations/usa/great-plains/st-louis"
          },
          {
            "name": "St Petersburg",
            "url": "https://www.lonelyplanet.com/destinations/usa/florida/st-petersburg"
          },
          {
            "name": "Tampa",
            "url": "https://www.lonelyplanet.com/destinations/usa/florida/tampa"
          },
          {
            "name": "Taos",
            "url": "https://www.lonelyplanet.com/destinations/usa/southwest/taos"
          },
          {
            "name": "Tennessee",
            "url": "https://www.lonelyplanet.com/destinations/usa/the-south/tennessee"
          },
          {
            "name": "Texas",
            "url": "https://www.lonelyplanet.com/destinations/usa/texas"
          },
          {
            "name": "The Adirondacks",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-york-state/the-adirondacks"
          },
          {
            "name": "The Everglades",
            "url": "https://www.lonelyplanet.com/destinations/usa/florida/the-everglades"
          },
          {
            "name": "The Great Lakes",
            "url": "https://www.lonelyplanet.com/destinations/usa/great-lakes"
          },
          {
            "name": "The Great Plains",
            "url": "https://www.lonelyplanet.com/destinations/usa/great-plains"
          },
          {
            "name": "The Road to Hana",
            "url": "https://www.lonelyplanet.com/destinations/usa/hawaii/the-road-to-hana"
          },
          {
            "name": "The Rocky Mountains",
            "url": "https://www.lonelyplanet.com/destinations/usa/rocky-mountains"
          },
          {
            "name": "The Southwest",
            "url": "https://www.lonelyplanet.com/destinations/usa/southwest"
          },
          {
            "name": "The Willamette Valley & Wine Country",
            "url": "https://www.lonelyplanet.com/destinations/usa/pacific-northwest/willamette-valley"
          },
          {
            "name": "Tucson",
            "url": "https://www.lonelyplanet.com/destinations/usa/southwest/tucson"
          },
          {
            "name": "Upper Peninsula",
            "url": "https://www.lonelyplanet.com/destinations/usa/great-lakes/upper-peninsula"
          },
          {
            "name": "Utah",
            "url": "https://www.lonelyplanet.com/destinations/usa/southwest/utah"
          },
          {
            "name": "Vermont",
            "url": "https://www.lonelyplanet.com/destinations/usa/new-england/vermont"
          },
          {
            "name": "Virginia",
            "url": "https://www.lonelyplanet.com/destinations/usa/virginia"
          },
          {
            "name": "Waikiki",
            "url": "https://www.lonelyplanet.com/destinations/usa/hawaii/waikiki"
          },
          {
            "name": "Walt Disney World",
            "url": "https://www.lonelyplanet.com/destinations/usa/florida/walt-disney-world"
          },
          {
            "name": "Wasatch Mountains",
            "url": "https://www.lonelyplanet.com/destinations/usa/southwest/wasatch-mountains-and-north"
          },
          {
            "name": "Washington",
            "url": "https://www.lonelyplanet.com/destinations/usa/pacific-northwest/washington"
          },
          {
            "name": "Washington Cascades",
            "url": "https://www.lonelyplanet.com/destinations/usa/washington/washington-cascades"
          },
          {
            "name": "Washington, DC",
            "url": "https://www.lonelyplanet.com/destinations/usa/washington-dc"
          },
          {
            "name": "Western USA",
            "url": "https://www.lonelyplanet.com/destinations/usa/western-usa"
          },
          {
            "name": "West Virginia",
            "url": "https://www.lonelyplanet.com/destinations/usa/west-virginia"
          },
          {
            "name": "Wisconsin",
            "url": "https://www.lonelyplanet.com/destinations/usa/great-lakes/wisconsin"
          },
          {
            "name": "Wyoming",
            "url": "https://www.lonelyplanet.com/destinations/usa/rocky-mountains/wyoming"
          },
          {
            "name": "Yellowstone & Grand Teton National Parks",
            "url": "https://www.lonelyplanet.com/destinations/usa/wyoming/yellowstone-grand-teton-national-parks"
          },
          {
            "name": "Yellowstone National Park",
            "url": "https://www.lonelyplanet.com/destinations/usa/rocky-mountains/yellowstone-national-park"
          },
          {
            "name": "Yosemite National Park",
            "url": "https://www.lonelyplanet.com/destinations/usa/yosemite-national-park"
          },
          {
            "name": "Yosemite & the Sierra Nevada",
            "url": "https://www.lonelyplanet.com/destinations/usa/california/sierra-nevada"
          },
          {
            "name": "Zion & Bryce Canyon National Parks",
            "url": "https://www.lonelyplanet.com/destinations/usa/utah/zion-bryce-canyon-national-parks"
          },
          {
            "name": "Zion National Park",
            "url": "https://www.lonelyplanet.com/destinations/usa/southwest/zion-national-park"
          }
        ]
      }
    ]
  },
  {
    "region": "SOUTH AMERICA",
    "countries": [
      {
        "region": "SOUTH AMERICA",
        "country": "Argentina",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/argentina",
        "cities": [
          {
            "name": "Buenos Aires",
            "url": "https://www.lonelyplanet.com/destinations/argentina/buenos-aires"
          },
          {
            "name": "Cafayate",
            "url": "https://www.lonelyplanet.com/destinations/argentina/northwest-argentina/cafayate"
          },
          {
            "name": "Córdoba",
            "url": "https://www.lonelyplanet.com/destinations/argentina/northwest-argentina/cordoba"
          },
          {
            "name": "El Calafate",
            "url": "https://www.lonelyplanet.com/destinations/argentina/patagonia/el-calafate"
          },
          {
            "name": "Iguazú Falls",
            "url": "https://www.lonelyplanet.com/destinations/argentina/iguazu-falls"
          },
          {
            "name": "Iguazú Falls & the Northeast",
            "url": "https://www.lonelyplanet.com/destinations/argentina/northeast-argentina"
          },
          {
            "name": "Mar del Plata",
            "url": "https://www.lonelyplanet.com/destinations/argentina/atlantic-coast/mar-del-plata"
          },
          {
            "name": "Mendoza",
            "url": "https://www.lonelyplanet.com/destinations/argentina/central-argentina/mendoza"
          },
          {
            "name": "Mendoza & the Central Andes",
            "url": "https://www.lonelyplanet.com/destinations/argentina/mendoza-the-central-andes"
          },
          {
            "name": "Patagonia",
            "url": "https://www.lonelyplanet.com/destinations/argentina/patagonia"
          },
          {
            "name": "Puerto Iguazú",
            "url": "https://www.lonelyplanet.com/destinations/argentina/northeast-argentina/puerto-iguazu"
          },
          {
            "name": "Puerto Madryn",
            "url": "https://www.lonelyplanet.com/destinations/argentina/patagonia/puerto-madryn"
          },
          {
            "name": "Rosario",
            "url": "https://www.lonelyplanet.com/destinations/argentina/northeast-argentina/rosario"
          },
          {
            "name": "Salta",
            "url": "https://www.lonelyplanet.com/destinations/argentina/northwest-argentina/salta"
          },
          {
            "name": "Salta & the Andean Northwest",
            "url": "https://www.lonelyplanet.com/destinations/argentina/northwest-argentina"
          },
          {
            "name": "San Antonio de Areco",
            "url": "https://www.lonelyplanet.com/destinations/argentina/atlantic-coast/san-antonio-de-areco"
          },
          {
            "name": "Tigre & the Delta",
            "url": "https://www.lonelyplanet.com/destinations/argentina/tigre-and-the-delta"
          },
          {
            "name": "Ushuaia",
            "url": "https://www.lonelyplanet.com/destinations/argentina/tierra-del-fuego/ushuaia"
          }
        ]
      },
      {
        "region": "SOUTH AMERICA",
        "country": "Bolivia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/bolivia",
        "cities": [
          {
            "name": "Amazon Basin",
            "url": "https://www.lonelyplanet.com/destinations/bolivia/the-amazon-basin"
          },
          {
            "name": "Cochabamba",
            "url": "https://www.lonelyplanet.com/destinations/bolivia/the-southwest/cochabamba"
          },
          {
            "name": "Isla del Sol",
            "url": "https://www.lonelyplanet.com/destinations/bolivia/isla-del-sol"
          },
          {
            "name": "Lake Titicaca",
            "url": "https://www.lonelyplanet.com/destinations/bolivia/lake-titicaca"
          },
          {
            "name": "La Paz",
            "url": "https://www.lonelyplanet.com/destinations/bolivia/la-paz"
          },
          {
            "name": "Salar de Uyuni",
            "url": "https://www.lonelyplanet.com/destinations/bolivia/salar-de-uyuni"
          },
          {
            "name": "Santa Cruz",
            "url": "https://www.lonelyplanet.com/destinations/bolivia/the-southeast/santa-cruz"
          },
          {
            "name": "Sucre",
            "url": "https://www.lonelyplanet.com/destinations/bolivia/the-southwest/sucre"
          },
          {
            "name": "Uyuni",
            "url": "https://www.lonelyplanet.com/destinations/bolivia/the-southwest/uyuni"
          }
        ]
      },
      {
        "region": "SOUTH AMERICA",
        "country": "Brazil",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/brazil",
        "cities": [
          {
            "name": "Alter do Chão",
            "url": "https://www.lonelyplanet.com/destinations/brazil/the-north/alter-do-chao"
          },
          {
            "name": "Bahia",
            "url": "https://www.lonelyplanet.com/destinations/brazil/bahia"
          },
          {
            "name": "Belém",
            "url": "https://www.lonelyplanet.com/destinations/brazil/the-north/belem"
          },
          {
            "name": "Belo Horizonte",
            "url": "https://www.lonelyplanet.com/destinations/brazil/the-southeast/belo-horizonte"
          },
          {
            "name": "Brasília",
            "url": "https://www.lonelyplanet.com/destinations/brazil/the-central-west/brasilia"
          },
          {
            "name": "Búzios",
            "url": "https://www.lonelyplanet.com/destinations/brazil/the-southeast/buzios"
          },
          {
            "name": "Curitiba",
            "url": "https://www.lonelyplanet.com/destinations/brazil/the-south/curitiba"
          },
          {
            "name": "Fernando de Noronha",
            "url": "https://www.lonelyplanet.com/destinations/brazil/fernando-de-noronha"
          },
          {
            "name": "Fortaleza",
            "url": "https://www.lonelyplanet.com/destinations/brazil/the-northeast/fortaleza"
          },
          {
            "name": "Foz do Iguaçu",
            "url": "https://www.lonelyplanet.com/destinations/brazil/the-south/foz-do-iguacu"
          },
          {
            "name": "Gramado",
            "url": "https://www.lonelyplanet.com/destinations/brazil/gramado"
          },
          {
            "name": "Ilha Grande & Vila do Abraão",
            "url": "https://www.lonelyplanet.com/destinations/brazil/the-southeast/ilha-grande"
          },
          {
            "name": "Jericoacoara",
            "url": "https://www.lonelyplanet.com/destinations/brazil/the-northeast/jericoacoara"
          },
          {
            "name": "Lençóis",
            "url": "https://www.lonelyplanet.com/destinations/brazil/the-northeast/lencois"
          },
          {
            "name": "Manaus",
            "url": "https://www.lonelyplanet.com/destinations/brazil/the-north/manaus"
          },
          {
            "name": "Minas Gerais",
            "url": "https://www.lonelyplanet.com/destinations/brazil/minas-gerais"
          },
          {
            "name": "Paraty",
            "url": "https://www.lonelyplanet.com/destinations/brazil/the-southeast/paraty"
          },
          {
            "name": "Parque Nacional dos Lençóis Maranhenses",
            "url": "https://www.lonelyplanet.com/destinations/brazil/parque-nacional-dos-lencois-maranhenses"
          },
          {
            "name": "Porto Alegre",
            "url": "https://www.lonelyplanet.com/destinations/brazil/the-south/porto-alegre"
          },
          {
            "name": "Praia da Pipa",
            "url": "https://www.lonelyplanet.com/destinations/brazil/the-northeast/praia-da-pipa"
          },
          {
            "name": "Recife",
            "url": "https://www.lonelyplanet.com/destinations/brazil/the-northeast/recife"
          },
          {
            "name": "Rio de Janeiro",
            "url": "https://www.lonelyplanet.com/destinations/brazil/rio-de-janeiro"
          },
          {
            "name": "Rio de Janeiro State",
            "url": "https://www.lonelyplanet.com/destinations/brazil/rio-de-janeiro-state"
          },
          {
            "name": "Salvador",
            "url": "https://www.lonelyplanet.com/destinations/brazil/the-northeast/salvador"
          },
          {
            "name": "Santa Catarina",
            "url": "https://www.lonelyplanet.com/destinations/brazil/santa-catarina"
          },
          {
            "name": "São Luís",
            "url": "https://www.lonelyplanet.com/destinations/brazil/the-northeast/sao-luis"
          },
          {
            "name": "São Paulo",
            "url": "https://www.lonelyplanet.com/destinations/brazil/sao-paulo"
          },
          {
            "name": "São Paulo State",
            "url": "https://www.lonelyplanet.com/destinations/brazil/sao-paulo-state"
          },
          {
            "name": "The Amazon",
            "url": "https://www.lonelyplanet.com/destinations/brazil/the-amazon"
          },
          {
            "name": "The Pantanal",
            "url": "https://www.lonelyplanet.com/destinations/brazil/the-central-west/the-pantanal"
          }
        ]
      },
      {
        "region": "SOUTH AMERICA",
        "country": "Chile",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/chile",
        "cities": [
          {
            "name": "Arica",
            "url": "https://www.lonelyplanet.com/destinations/chile/northern-chile/arica"
          },
          {
            "name": "Cajón del Maipo",
            "url": "https://www.lonelyplanet.com/destinations/chile/cajon-del-maipo"
          },
          {
            "name": "Chiloé",
            "url": "https://www.lonelyplanet.com/destinations/chile/chiloe"
          },
          {
            "name": "Concepción",
            "url": "https://www.lonelyplanet.com/destinations/chile/middle-chile/concepcion"
          },
          {
            "name": "Coyhaique",
            "url": "https://www.lonelyplanet.com/destinations/chile/northern-patagonia/coyhaique"
          },
          {
            "name": "Elqui Valley",
            "url": "https://www.lonelyplanet.com/destinations/chile/elqui-valley"
          },
          {
            "name": "Iquique",
            "url": "https://www.lonelyplanet.com/destinations/chile/northern-chile/iquique"
          },
          {
            "name": "La Serena",
            "url": "https://www.lonelyplanet.com/destinations/chile/northern-chile/la-serena"
          },
          {
            "name": "Middle Chile",
            "url": "https://www.lonelyplanet.com/destinations/chile/middle-chile"
          },
          {
            "name": "Northern Patagonia",
            "url": "https://www.lonelyplanet.com/destinations/chile/northern-patagonia"
          },
          {
            "name": "Parque Nacional Torres del Paine",
            "url": "https://www.lonelyplanet.com/destinations/chile/southern-patagonia/parque-nacional-torres-del-paine"
          },
          {
            "name": "Pucón",
            "url": "https://www.lonelyplanet.com/destinations/chile/the-lakes-district/pucon"
          },
          {
            "name": "Puerto Montt",
            "url": "https://www.lonelyplanet.com/destinations/chile/the-lakes-district/puerto-montt"
          },
          {
            "name": "Puerto Natales",
            "url": "https://www.lonelyplanet.com/destinations/chile/southern-patagonia/puerto-natales"
          },
          {
            "name": "Puerto Varas",
            "url": "https://www.lonelyplanet.com/destinations/chile/the-lakes-district/puerto-varas"
          },
          {
            "name": "Punta Arenas",
            "url": "https://www.lonelyplanet.com/destinations/chile/southern-patagonia/punta-arenas"
          },
          {
            "name": "Rapa Nui (Easter Island)",
            "url": "https://www.lonelyplanet.com/destinations/chile/rapa-nui-easter-island"
          },
          {
            "name": "San Pedro de Atacama",
            "url": "https://www.lonelyplanet.com/destinations/chile/northern-chile/san-pedro-de-atacama"
          },
          {
            "name": "Santiago",
            "url": "https://www.lonelyplanet.com/destinations/chile/santiago"
          },
          {
            "name": "Southern Patagonia",
            "url": "https://www.lonelyplanet.com/destinations/chile/southern-patagonia"
          },
          {
            "name": "The Lakes District",
            "url": "https://www.lonelyplanet.com/destinations/chile/the-lakes-district-1327021"
          },
          {
            "name": "Valparaíso",
            "url": "https://www.lonelyplanet.com/destinations/chile/valparaiso"
          },
          {
            "name": "Viña Del Mar",
            "url": "https://www.lonelyplanet.com/destinations/chile/vina-del-mar"
          }
        ]
      },
      {
        "region": "SOUTH AMERICA",
        "country": "Colombia",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/colombia",
        "cities": [
          {
            "name": "Amazon Basin",
            "url": "https://www.lonelyplanet.com/destinations/colombia/amazon-basin"
          },
          {
            "name": "Armenia",
            "url": "https://www.lonelyplanet.com/destinations/colombia/northwest-colombia/armenia"
          },
          {
            "name": "Barranquilla",
            "url": "https://www.lonelyplanet.com/destinations/colombia/barranquilla"
          },
          {
            "name": "Bogotá",
            "url": "https://www.lonelyplanet.com/destinations/colombia/bogota"
          },
          {
            "name": "Bucaramanga",
            "url": "https://www.lonelyplanet.com/destinations/colombia/north-of-bogota/bucaramanga"
          },
          {
            "name": "Cali",
            "url": "https://www.lonelyplanet.com/destinations/colombia/southwest-colombia/cali"
          },
          {
            "name": "Caribbean Coast",
            "url": "https://www.lonelyplanet.com/destinations/colombia/caribbean-coast"
          },
          {
            "name": "Cartagena",
            "url": "https://www.lonelyplanet.com/destinations/colombia/caribbean-coast/cartagena"
          },
          {
            "name": "Ciudad Perdida",
            "url": "https://www.lonelyplanet.com/destinations/colombia/ciudad-perdida"
          },
          {
            "name": "Guatapé",
            "url": "https://www.lonelyplanet.com/destinations/colombia/guatape"
          },
          {
            "name": "Islas del Rosario",
            "url": "https://www.lonelyplanet.com/destinations/colombia/islas-del-rosario"
          },
          {
            "name": "La Guajira Peninsula",
            "url": "https://www.lonelyplanet.com/destinations/colombia/la-guajira-peninsula"
          },
          {
            "name": "Leticia",
            "url": "https://www.lonelyplanet.com/destinations/colombia/amazon-basin/leticia"
          },
          {
            "name": "Manizales",
            "url": "https://www.lonelyplanet.com/destinations/colombia/manizales"
          },
          {
            "name": "Medellín",
            "url": "https://www.lonelyplanet.com/destinations/colombia/northwest-colombia/medellin"
          },
          {
            "name": "Minca",
            "url": "https://www.lonelyplanet.com/destinations/colombia/minca"
          },
          {
            "name": "Pacific Coast",
            "url": "https://www.lonelyplanet.com/destinations/colombia/pacific-coast"
          },
          {
            "name": "Parque Nacional Natural Tayrona",
            "url": "https://www.lonelyplanet.com/destinations/colombia/caribbean-coast/parque-nacional-tayrona"
          },
          {
            "name": "Pereira",
            "url": "https://www.lonelyplanet.com/destinations/colombia/pereira"
          },
          {
            "name": "Popayán",
            "url": "https://www.lonelyplanet.com/destinations/colombia/southwest-colombia/popayan"
          },
          {
            "name": "Providencia",
            "url": "https://www.lonelyplanet.com/destinations/colombia/san-andres-and-providencia/providencia"
          },
          {
            "name": "Puerto Nariño",
            "url": "https://www.lonelyplanet.com/destinations/colombia/puerto-narino"
          },
          {
            "name": "Riohacha",
            "url": "https://www.lonelyplanet.com/destinations/colombia/riohacha"
          },
          {
            "name": "Salento",
            "url": "https://www.lonelyplanet.com/destinations/colombia/salento"
          },
          {
            "name": "San Andrés",
            "url": "https://www.lonelyplanet.com/destinations/colombia/san-andres-and-providencia/san-andres"
          },
          {
            "name": "San Andrés & Providencia",
            "url": "https://www.lonelyplanet.com/destinations/colombia/san-andres-and-providencia"
          },
          {
            "name": "San Gil",
            "url": "https://www.lonelyplanet.com/destinations/colombia/north-of-bogota/san-gil"
          },
          {
            "name": "Santa Marta",
            "url": "https://www.lonelyplanet.com/destinations/colombia/caribbean-coast/santa-marta"
          },
          {
            "name": "Villa de Leyva",
            "url": "https://www.lonelyplanet.com/destinations/colombia/north-of-bogota/villa-de-leyva"
          },
          {
            "name": "Zona Cafetera",
            "url": "https://www.lonelyplanet.com/destinations/colombia/northwest-colombia/zona-cafetera"
          }
        ]
      },
      {
        "region": "SOUTH AMERICA",
        "country": "Ecuador",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/ecuador",
        "cities": [
          {
            "name": "Baños",
            "url": "https://www.lonelyplanet.com/destinations/ecuador/central-highlands/banos"
          },
          {
            "name": "Central Highlands",
            "url": "https://www.lonelyplanet.com/destinations/ecuador/central-highlands"
          },
          {
            "name": "Coca",
            "url": "https://www.lonelyplanet.com/destinations/ecuador/the-oriente/coca"
          },
          {
            "name": "Cuenca",
            "url": "https://www.lonelyplanet.com/destinations/ecuador/the-southern-highlands/cuenca"
          },
          {
            "name": "Guayaquil",
            "url": "https://www.lonelyplanet.com/destinations/ecuador/pacific-coast-and-lowlands/guayaquil"
          },
          {
            "name": "Loja",
            "url": "https://www.lonelyplanet.com/destinations/ecuador/the-southern-highlands/loja"
          },
          {
            "name": "Montañita",
            "url": "https://www.lonelyplanet.com/destinations/ecuador/pacific-coast-and-lowlands/montanita"
          },
          {
            "name": "North Coast & Lowlands",
            "url": "https://www.lonelyplanet.com/destinations/ecuador/pacific-coast-and-lowlands"
          },
          {
            "name": "Otavalo",
            "url": "https://www.lonelyplanet.com/destinations/ecuador/northern-highlands/otavalo"
          },
          {
            "name": "Papallacta",
            "url": "https://www.lonelyplanet.com/destinations/ecuador/papallacta"
          },
          {
            "name": "Puerto Ayora",
            "url": "https://www.lonelyplanet.com/destinations/ecuador/the-galapagos-islands/puerto-ayora"
          },
          {
            "name": "Puyo",
            "url": "https://www.lonelyplanet.com/destinations/ecuador/the-oriente/puyo"
          },
          {
            "name": "Quito",
            "url": "https://www.lonelyplanet.com/destinations/ecuador/quito"
          },
          {
            "name": "South Coast",
            "url": "https://www.lonelyplanet.com/destinations/ecuador/south-coast"
          },
          {
            "name": "Tena",
            "url": "https://www.lonelyplanet.com/destinations/ecuador/the-oriente/tena"
          },
          {
            "name": "The Galápagos Islands",
            "url": "https://www.lonelyplanet.com/destinations/ecuador/the-galapagos-islands"
          },
          {
            "name": "The Oriente",
            "url": "https://www.lonelyplanet.com/destinations/ecuador/the-oriente"
          },
          {
            "name": "The Quilotoa Loop",
            "url": "https://www.lonelyplanet.com/destinations/ecuador/central-highlands/the-quilotoa-loop"
          },
          {
            "name": "Vilcabamba",
            "url": "https://www.lonelyplanet.com/destinations/ecuador/the-southern-highlands/vilcabamba"
          }
        ]
      },
      {
        "region": "SOUTH AMERICA",
        "country": "Paraguay",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/paraguay",
        "cities": [
          {
            "name": "Asunción",
            "url": "https://www.lonelyplanet.com/destinations/paraguay/asuncion"
          }
        ]
      },
      {
        "region": "SOUTH AMERICA",
        "country": "Peru",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/peru",
        "cities": [
          {
            "name": "Aguas Calientes",
            "url": "https://www.lonelyplanet.com/destinations/peru/cuzco-and-the-sacred-valley/aguas-calientes"
          },
          {
            "name": "Amazon Basin",
            "url": "https://www.lonelyplanet.com/destinations/peru/amazon-basin"
          },
          {
            "name": "Arequipa",
            "url": "https://www.lonelyplanet.com/destinations/peru/arequipa-and-canyon-country/arequipa"
          },
          {
            "name": "Ayacucho",
            "url": "https://www.lonelyplanet.com/destinations/peru/central-highlands/ayacucho"
          },
          {
            "name": "Cañón Del Colca",
            "url": "https://www.lonelyplanet.com/destinations/peru/arequipa-and-canyon-country/canon-del-colca"
          },
          {
            "name": "Choquequirao",
            "url": "https://www.lonelyplanet.com/destinations/peru/choquequirao"
          },
          {
            "name": "Cordillera Blanca",
            "url": "https://www.lonelyplanet.com/destinations/peru/cordillera-blanca"
          },
          {
            "name": "Cuzco",
            "url": "https://www.lonelyplanet.com/destinations/peru/cuzco"
          },
          {
            "name": "Cuzco & the Sacred Valley",
            "url": "https://www.lonelyplanet.com/destinations/peru/cuzco-and-the-sacred-valley/cuzco"
          },
          {
            "name": "Huacachina",
            "url": "https://www.lonelyplanet.com/destinations/peru/south-coast/huacachina"
          },
          {
            "name": "Huaraz",
            "url": "https://www.lonelyplanet.com/destinations/peru/huaraz-and-the-cordilleras/huaraz"
          },
          {
            "name": "Iquitos",
            "url": "https://www.lonelyplanet.com/destinations/peru/amazon-basin/iquitos"
          },
          {
            "name": "Lake Titicaca",
            "url": "https://www.lonelyplanet.com/destinations/peru/lake-titicaca"
          },
          {
            "name": "Lima",
            "url": "https://www.lonelyplanet.com/destinations/peru/lima"
          },
          {
            "name": "Machu Picchu",
            "url": "https://www.lonelyplanet.com/destinations/peru/machu-picchu"
          },
          {
            "name": "Ollantaytambo",
            "url": "https://www.lonelyplanet.com/destinations/peru/cuzco-and-the-sacred-valley/ollantaytambo"
          },
          {
            "name": "Puerto Maldonado",
            "url": "https://www.lonelyplanet.com/destinations/peru/amazon-basin/puerto-maldonado"
          },
          {
            "name": "Puno",
            "url": "https://www.lonelyplanet.com/destinations/peru/lake-titicaca/puno"
          },
          {
            "name": "The Inca Trail",
            "url": "https://www.lonelyplanet.com/destinations/peru/the-inca-trail"
          },
          {
            "name": "The Sacred Valley",
            "url": "https://www.lonelyplanet.com/destinations/peru/cuzco-and-the-sacred-valley/the-sacred-valley"
          },
          {
            "name": "Trujillo",
            "url": "https://www.lonelyplanet.com/destinations/peru/north-coast/trujillo"
          }
        ]
      },
      {
        "region": "SOUTH AMERICA",
        "country": "Uruguay",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/uruguay",
        "cities": [
          {
            "name": "Colonia del Sacramento",
            "url": "https://www.lonelyplanet.com/destinations/uruguay/western-uruguay/colonia-del-sacramento"
          },
          {
            "name": "Montevideo",
            "url": "https://www.lonelyplanet.com/destinations/uruguay/montevideo"
          },
          {
            "name": "Punta del Diablo",
            "url": "https://www.lonelyplanet.com/destinations/uruguay/eastern-uruguay/punta-del-diablo"
          },
          {
            "name": "Punta del Este",
            "url": "https://www.lonelyplanet.com/destinations/uruguay/eastern-uruguay/punta-del-este"
          }
        ]
      },
      {
        "region": "SOUTH AMERICA",
        "country": "Venezuela",
        "overviewUrl": "https://www.lonelyplanet.com/destinations/venezuela",
        "cities": [
          {
            "name": "Caracas",
            "url": "https://www.lonelyplanet.com/destinations/venezuela/caracas"
          }
        ]
      }
    ]
  }
] as const;
