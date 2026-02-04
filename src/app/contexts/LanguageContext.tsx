import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "mn" | "kr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  mn: {
    // Navigation
    navHero: "Эхлэл",
    navGallery: "Зургууд",
    navTimeline: "Түүх",
    navLetter: "Захидал",
    navMusic: "Дуу",
    navCurry: "Карри",
    navMessage: "Мессеж",
    navEnding: "Төгсгөл",

    // Hero
    heroTitle: "Төрсөн өдрийн мэнд",
    heroSubtitle:
      "Чиний төрсөн өдрөөр зөвхөн бид хоёрын мэдэх website хийхийг хүссэн юм. Олон зураг бичлэг байсан ч цөөхөн хэдийг нь сонгоод оруулчихлаа. Өөр хүн орч чадахгүй болохоор битгий санаа зовоорой.",

    // Photo Gallery
    photoGalleryTitle: "Бидний дурсамж",
    photoCaption1: "Анхны уулзалт - кофены дэлгүүр",
    photoCaption2: "Цасан өдөр хамтдаа",
    photoCaption3: "Чиний инээмсэглэл",
    photoCaption4: "Зуны амралт",
    photoCaption5: "Гэртээ хамтдаа хоол хийх",
    photoCaption6: "Намрын өдөр паркт",
    photoCaption7: "Манай хамгийн сайхан үе",
    photoCaption8: "Жинхэнэ аз жаргал",
    photoCaption9: "Хамтдаа инээх",
    photoCaption10: "Чамтай хамт байх нь",
    photoCaption11: "Сайхан дурсамж",
    photoCaption12: "Хамтдаа аялал",
    photoCaption13: "Чиний хайр",
    photoCaption14: "Мөнхийн мөч",
    photoCaption15: "Дурсамж",
    photoCaptionCurry: "Чиний хийсэн карри - дэлхийн хамгийн амттай",

    // Timeline
    timelineTitle: "Дурсамж",
    timeline1Date: "2023.03.15",
    timeline1Place: "Анхны уулзалт",
    timeline1Memory:
      "Анх уулзсан өдөр авсан бяцхан сарнай. Тоглоомдоо ялагдсанаа мэдсэн баяртай өдөр.",
    timeline2Date: "2023.04.22",
    timeline2Place: "Эхний болзоо",
    timeline2Memory: "Дарханд авсан нууц дуран :)",
    timeline3Date: "2023.06.10",
    timeline3Place: "Далайн эрэг",
    timeline3Memory: "Дэлхий дээрх хамгийн амттай карэ",
    timeline4Date: "2023.08.15",
    timeline4Place: "Чиний гэр",
    timeline4Memory:
      "Гоё хоол хийж өгч байхад нь нууц дурангийн ажлаа хийж байгаан",
    timeline5Date: "2023.11.03",
    timeline5Place: "Концерт",
    timeline5Memory:
      "Гоё хоол захиалж идэнгээ нэгнийхээ дуртай дуугаа сонсгож байсан орой",
    timeline6Date: "2024.01.20",
    timeline6Place: "Өвөл",
    timeline6Memory:
      "Миний хамгийн мартагдашгүй үе байх аа. Ажлаас тараад л гэртээ ирч байгаа юм шиг мэдрэмж төрдөг...",
    timeline7Date: "2024.02.05",
    timeline7Place: "Дурсамж",
    timeline7Memory: `Зүгээр л favorites дотор байдаг бичлэг. Нэр нь "Болиоч"`,
    timeline8Date: "2024.02.05",
    timeline8Place: "Дурсамж",
    timeline8Memory: `Зүгээр л favorites дотор байдаг бичлэг. Нэр нь "Намайг тоохгүй утсаа оролдоод байна"`,

    // Letter
    letterTitle: "Чамд хандсан захидал",
    letterEnvelopeText: "Нээх",
    letterContent: `Сайн уу,

Энэ web-ийг чамд явуулах эсэхдээ олон удаа эргэлзэж "Цавуу шиг наалдаад салахгүй байгаа юм шиг мэдрэмж төрүүлчих болов уу?" гэх мэтээр бодсон ч зүгээр л талархаж явдгаа илэрхийлэх утгаар хийхэд болох юм шиг санагдаад сурсан мэргэжлээ ашиглаад хийлээ.

Чамтай учирсан нь миний амьдралын хамгийн сайхан тохиолдол байсан. IG дээр дагадаг байсан нэг гадаад эмэгтэйтэй их төстэй санагдаад, утасны цаанаас анхны харцаар дурласан гэдэг нь байх даа. Зориг гаргаад л бичсэн баахан аниулаад, story дээр нь юм бичихээр сүүлдээ хха гэсэн хариу аваад л баярладаг байсан.

Тэгээд л хальт хальт хариу өгдөг болоод л тэгж байснаа найз залуутай гэж худлаа хэлж байж билээ. Тэр үедээ итгэсэн л дээ:).

Одоо бодох нь ээ дотносож ирээд мэдээж илүү их хайртай болсон ч хэзээ ч салахгүй юм шиг санагдаж энэ анхных шигээ тоохгүй бол яана аа, салчихвал яана аа гэсэн сандрал, айдсын талаар анзааралгүй тэнэг дүлий л болчихсон байж. Алддаггүй төгс хүн байхгүй ч ярилцаж засах, эцсээ хүртэл яваад үзэх боломжийг хүртэж чадаагүй дээ харамссан жил байлаа.

Чамтай хамт аймшгийн кино үзэх, анимэ үзэх, ML тоглож ялчихаад өдөж уурласан хөөрхөн царайг нь харах, зүгээр л зорилгогүй тэнэг юм ярих - энэ бүхэн надад том зүйл байж.

Алдаанаасаа суралцдаг гэж ярьдаг ч энэ алдаагаа өөр хүн дээр алдсан ч болоосой гэж ч бодох шиг.

Энэ олон сар өдрийн дараа чамайг гэх сэтгэл минь өчүүхэн ч багасаагүй ч надгүй өдрүүд чамд илүү амар тайван, аз жаргалтай байгаа гэдэгт найдаж, чиний шийдвэрт итгэж байгаа болохоор миний хайр чамайг өөрөөсөө явуулж чадахаар их хүчтэй гэдэг шиг шөнө болгон нойргүйдэж хонохдоо энэ үгийг боддог болсон.

Чиний аз жаргал миний хувьд хамгийн чухал зүйл.

Төрсөн өдрийн мэнд хүргэе. Чиний ирээдүй гэрэлтэж, чиний зүрх үргэлж баяр баясгалангаар дүүрэн байг. Чи бусдаас илүү их аз жаргалыг хүртэх ёстой.

Үүрд хайртай
`,

    // Music
    musicTitle: "Чиний дуртай дуунууд",
    musicSubtitle: "BAEKHYUN - чиний дуртай дуучин",
    song1: "Candy",
    song2: "Un Village",
    song3: "Bambi",
    song4: "Love Scene",
    song5: "Beautiful",
    artist: "BAEKHYUN",

    // Curry
    curryTitle: "Дэлхийн хамгийн амттай карри",
    curryText1: "Чиний хийсэн карри бол миний хүртсэн хамгийн амттай хоол.",
    curryText2: "Чи зүгээр л хоол хийдэггүй - чи хайраа тэнд хийдэг.",
    curryText3:
      "Тэр халуун зуны өдөр, чиний гэрт анх удаа чиний карри идсэн өдрөө санадаг.",
    curryText4:
      "Амт нь төгс байсан. Гэхдээ хамгийн сайхан нь чамтай хамт байсан.",
    curryText5:
      "Чиний карри одоо ч гэсэн дэлхийн миний хамгийн дуртай хоол хэвээр байна.",

    // Message Form
    formTitle: "Надад хэлэхийг хүсч буй зүйл",
    formPlaceholder:
      "Надад хэлэхийг хүсч буй зүйлээ байвал бичээрэй. Миний mail рүү явна...",
    formNameLabel: "Нэр (сонголттой)",
    formNamePlaceholder: "Чиний нэр",
    formSubmit: "Чимээгүйхэн илгээх",
    formSuccess: "Баярлалаа. Би үүнийг анхааралтай уншина аа.",

    // Ending
    endingMessage:
      "Энд хүртэл уншсанд баярлалаа. Чиний ирээдүй инээмсэглэлээр дүүрэн байх болтугай.",
    thankYou: "Төрсөн өдрийн мэнд хүргэе",

    // Language Switcher
    language: "Хэл",
  },
  kr: {
    // Navigation
    navHero: "시작",
    navGallery: "사진",
    navTimeline: "스토리",
    navLetter: "편지",
    navMusic: "노래",
    navCurry: "카레",
    navMessage: "메시지",
    navEnding: "마지막",

    // Hero
    heroTitle: "생일 축하해",
    heroSubtitle:
      "네 생일을 맞아 우리 둘만 아는 웹사이트를 만들고 싶었어. 사진과 영상이 많았지만 몇 개만 골라서 넣었어. 다른 사람은 들어올 수 없으니까 걱정하지 마.",

    // Photo Gallery
    photoGalleryTitle: "우리의 추억",
    photoCaption1: "첫 만남 - 카페에서",
    photoCaption2: "눈 오는 날 함께",
    photoCaption3: "너의 미소",
    photoCaption4: "여름 휴가",
    photoCaption5: "집에서 함께 요리하기",
    photoCaption6: "가을날 공원에서",
    photoCaption7: "우리의 가장 행복한 시간",
    photoCaption8: "진정한 행복",
    photoCaption9: "함께 웃기",
    photoCaption10: "너와 함께 있는 것",
    photoCaption11: "아름다운 추억",
    photoCaption12: "함께한 여행",
    photoCaption13: "너의 사랑",
    photoCaption14: "영원한 순간",
    photoCaption15: "추억",
    photoCaptionCurry: "네가 만든 카레 - 세상에서 가장 맛있어",

    // Timeline
    timelineTitle: "추억",
    timeline1Date: "2023.03.15",
    timeline1Place: "첫 만남",
    timeline1Memory:
      "처음 만난 날 받은 작은 장미. 게임에서 졌다는 걸 알게 된 행복한 날.",
    timeline2Date: "2023.04.22",
    timeline2Place: "첫 데이트",
    timeline2Memory: "다르항에서 찍은 비밀 몰카 :)",
    timeline3Date: "2023.06.10",
    timeline3Place: "바닷가",
    timeline3Memory: "세상에서 가장 맛있는 카레",
    timeline4Date: "2023.08.15",
    timeline4Place: "너의 집",
    timeline4Memory: "맛있는 요리 해줄 때 비밀 몰카 작업 중이었어",
    timeline5Date: "2023.11.03",
    timeline5Place: "콘서트",
    timeline5Memory:
      "맛있는 음식 시켜 먹으면서 서로 좋아하는 노래 들려주던 저녁",
    timeline6Date: "2024.01.20",
    timeline6Place: "겨울",
    timeline6Memory:
      "내 가장 잊지 못할 시간인 것 같아. 퇴근하고 집에 오는 것 같은 느낌이 들었어...",
    timeline7Date: "2024.02.05",
    timeline7Place: "추억",
    timeline7Memory: `그냥 favorites에 있는 영상. 이름은 "그만해"`,
    timeline8Date: "2024.02.05",
    timeline8Place: "추억",
    timeline8Memory: `그냥 favorites에 있는 영상. 이름은 "나 무시하고 폰만 보고 있어"`,

    // Letter
    letterTitle: "너에게 보내는 편지",
    letterEnvelopeText: "열기",
    letterContent: `안녕,

이 웹사이트를 보낼지 말지 여러 번 망설였어. "찐득하게 안 떨어지는 것처럼 느껴지지 않을까?" 이런 생각도 했지만, 그냥 감사하는 마음을 표현하고 싶어서 배운 전공을 활용해서 만들었어.

너를 만난 건 내 인생에서 가장 아름다운 일이었어. IG에서 팔로우하던 외국 여자분이랑 많이 닮아 보여서, 화면 너머로 첫눈에 반했나 봐. 용기 내서 DM 보내고 많이 씹히다가, 스토리에 뭔가 쓰면 나중에 ㅎㅎ라는 답장 받고 기뻐했었어.

그러다가 조금씩 답장해주기 시작했는데, 남자친구 있다고 거짓말했었잖아. 그때는 믿었지 :)

지금 생각해보면 가까워지면서 당연히 더 사랑하게 됐는데, 절대 헤어지지 않을 것 같아서 처음처럼 무시당하면 어쩌지, 헤어지면 어쩌지 하는 불안과 두려움을 눈치채지 못하고 바보처럼 굴었던 것 같아. 완벽한 사람은 없지만 대화하고 고치고, 끝까지 가볼 기회조차 갖지 못한 게 후회되는 한 해였어.

같이 공포영화 보고, 애니메이션 보고, ML 하다가 내가 이겨서 짜증내는 귀여운 얼굴 보고, 그냥 목적 없이 바보 같은 얘기하는 것 - 이 모든 게 나한테 큰 의미였어.

실수에서 배운다고 하지만, 이 실수는 다른 사람한테 했으면 좋겠다는 생각도 들어.

이 많은 달과 날이 지나도 너를 향한 내 마음은 조금도 줄지 않았지만, 내가 없는 날들이 너한테 더 편하고 행복하길 바라고, 네 결정을 믿기 때문에 내 사랑이 너를 보낼 수 있을 만큼 강하다는 말처럼 매일 밤 잠 못 이루며 이 말을 생각하게 됐어.

네 행복이 나한테 가장 중요한 거야.

생일 축하해. 네 미래가 밝고, 네 마음이 항상 기쁨으로 가득하길. 넌 누구보다 더 많은 행복을 받을 자격이 있어.

영원히 사랑해
`,

    // Music
    musicTitle: "네가 좋아하는 노래들",
    musicSubtitle: "BAEKHYUN - 네가 사랑하는 가수",
    song1: "Candy",
    song2: "Un Village",
    song3: "Bambi",
    song4: "Love Scene",
    song5: "Beautiful",
    artist: "BAEKHYUN",

    // Curry
    curryTitle: "세상에서 가장 맛있는 카레",
    curryText1: "네가 만든 카레는 내가 먹어본 가장 맛있는 음식이야.",
    curryText2: "넌 그냥 요리를 하는 게 아니라 - 거기에 사랑을 담아.",
    curryText3: "그 더운 여름날, 네 집에서 처음 네 카레를 먹었던 ���을 기억해.",
    curryText4: "맛은 완벽했어. 하지만 가장 좋았던 건 너와 함께였다는 거야.",
    curryText5: "네 카레는 아직도 세상에서 내가 가장 좋아하는 음식이야.",

    // Message Form
    formTitle: "나에게 하고 싶은 말",
    formPlaceholder: "나에게 하고 싶은 말을 써줘...",
    formNameLabel: "이름 (선택사항)",
    formNamePlaceholder: "네 이름",
    formSubmit: "조용히 보내기",
    formSuccess: "고마워. 잘 읽을게.",

    // Ending
    endingMessage:
      "여기까지 읽어줘서 고마워. 너의 미래가 미소로 가득하길 바래.",
    thankYou: "생일 축하해",

    // Language Switcher
    language: "언어",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("mn");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.mn] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
