# Tarot Falı Uygulaması Mimari Analiz Raporu

Bu rapor, `tarot-fal` projesinin temel yapı taşlarını, çoklu dil (i18n) mimarisini, veri doğrulama stratejilerini, veritabanı tasarımını ve önyüz (frontend) bileşen yapısını incelemektedir. Proje, Next.js App Router tabanlı tam kapsamlı (Full-Stack) bir web uygulamasıdır.

## 1. i18n (Çoklu Dil) Mimarisi
Uygulama, Next.js'in App Router yapısıyla uyumlu, dinamik bir çoklu dil desteğine sahiptir.

*   **Klasör ve Yönlendirme Yapısı:** Uygulamanın sayfaları `src/app/[locale]/` dizini altında yer almaktadır. `middleware.ts` dosyası, `next-i18n-router` paketini kullanarak gelen istekleri kullanıcının dil tercihine göre ilgili `[locale]` dizinine yönlendirmektedir.
*   **Dil Konfigürasyonu:** Kök dizindeki `i18nConfig.ts` dosyasında uygulamanın desteklediği diller (`tr` ve `en`) belirlenmiştir. Varsayılan dil Türkçe (`tr`) olarak ayarlanmış olup, `prefixDefault: false` konfigürasyonu ile ana dilde URL'de `/tr` ekinin gösterilmemesi (doğrudan ana domain üzerinden erişilmesi) sağlanmıştır.
*   **Çeviri Yönetimi:** `i18next`, `react-i18next` ve `i18next-resources-to-backend` kütüphaneleri kullanılmaktadır. Çeviri fonksiyonlarını hazırlayan yapı `src/i18n/index.ts` içerisinde konumlandırılmıştır.
*   **Dil Dosyaları:** Çeviri metinleri (JSON formatında) `src/locales/` dizini altında (`tr` ve `en` klasörlerinde) `common.json` gibi isimlendirmelerle tutulmaktadır.
*   **İstemci Bileşenleri (Client Components):** Çevirilerin istemci (client) tarafındaki bileşenlerde de kullanılabilmesi için `src/components/TranslationsProvider.tsx` yapısı kurulmuştur.

## 2. Form ve Veri Validasyonu (`src/schemas`)
Uygulamadaki form doğrulama işlemleri **Zod** kütüphanesi kullanılarak oldukça sağlam ve genişletilebilir bir şekilde tasarlanmıştır.

*   **`booking-schema.ts` İncelemesi:**
    *   Kullanıcı iletişim bilgileri (isim, e-posta, telefon), servis tipi, tarih ve saat seçimi standart olarak doğrulanmaktadır.
    *   **Dinamik ve Çoklu Dil Destekli Validasyon:** Schema sadece statik oluşturulmamış, aynı zamanda çoklu dil desteğine uygun şekilde bir `getBookingFormSchema(t)` fonksiyonu ile dışarıya açılmıştır. Bu fonksiyon, Next.js çeviri mekanizmasından gelen `t` fonksiyonunu parametre alarak validasyon hata mesajlarını anlık olarak çevrilmiş bir şekilde döndürür.
    *   **Koşullu Doğrulama (SuperRefine):** Seçilen hizmet türüne göre ekstra kontroller yapılmıştır. Eğer `serviceType` olarak "Astroloji Haritası" veya "Detaylı Tarot" seçilirse; `birthDate` (Doğum Tarihi), `birthTime` (Doğum Saati) ve `birthPlace` (Doğum Yeri) alanlarının da doldurulması `superRefine` metodu ile zorunlu hale getirilmiştir.

## 3. Veritabanı ve İlişkiler (`prisma/schema.prisma`)
Projede ORM olarak **Prisma** ve veritabanı olarak **PostgreSQL** kullanılmaktadır. Mevcut şema randevu ve hizmet yönetimini merkezine almıştır.

*   **`Appointment` (Randevu) Modeli:** 
    *   Kullanıcının adı, e-postası, telefonu gibi temel bilgileri ile özel notları barındırır.
    *   Astroloji analizi gerektiren işlemler için opsiyonel doğum bilgileri (`birthDate`, `birthTime`, `birthPlace`) alanlarını içerir.
    *   Alınan hizmetin türünü (`serviceType`) kaydeder.
    *   Durum takibi için varsayılanı `PENDING` olan `AppointmentStatus` (PENDING, CONFIRMED, CANCELLED, COMPLETED) enum'unu kullanır.
*   **`TimeSlot` (Zaman Dilimi) Modeli:**
    *   Hizmet verilebilecek saat aralıklarını (örn. `startTime: "10:00"`, `endTime: "11:00"`) ve bu slotun müsaitlik durumunu (`isAvailable`) tutar.
*   **İlişki Yapısı:** Her `Appointment`, bir `TimeSlot`'a bağlıdır (Bire-Çok ilişkisi: Bir TimeSlot altında birden fazla rezervasyon olabilse de iş mantığı gereği genelde bir slot doluysa diğer randevulara kapanması beklenir. Şema düzeyinde bir `TimeSlot`'un birden çok `Appointment` listesi tutabildiği `appointments Appointment[]` ilişkisi tanımlanmıştır).
*   **Gelecek Planlaması:** Şema dosyasının altında eğitim (Course, CourseModule) ve e-ticaret (Product) özellikleri için yorum satırına alınmış taslak modeller bulunmaktadır. Bu da uygulamanın ileriye dönük vizyonunu göstermektedir.

## 4. Frontend Mimarisi ve UI Kütüphanesi (`shadcn/ui`)
Önyüz geliştirme sürecinde **Tailwind CSS** ile birlikte modern ve özelleştirilebilir bir bileşen kütüphanesi olan **shadcn/ui** tercih edilmiştir.

*   **Konfigürasyon (`components.json`):** Projenin kök dizininde bulunan konfigürasyon dosyasına göre `radix-nova` stili seçilmiş, renk paleti temeli `neutral` üzerine kurulmuş ve CSS değişkenleri (`cssVariables: true`) aktif edilmiştir.
*   **Dizin Yapısı:** 
    *   Tüm paylaşımlı ve genel bileşenler `src/components` altında toplanmıştır.
    *   shadcn/ui ile projeye dahil edilen base UI bileşenleri (buton, input, kart vb.) `src/components/ui/` dizininde konumlandırılmıştır.
    *   Modüler bir yaklaşım benimsenerek iş mantığı veya özellik bazlı klasörlemelere gidilmiştir (Örn: `admin/`, `booking/`, `shared/`). Bu yapı, kodun bakımını ve okunabilirliğini büyük ölçüde kolaylaştırmaktadır.
    *   Bileşenlerde kullanılacak stil ve birleştirme yardımcı fonksiyonları için `@/lib/utils` alias'ı projeye entegre edilmiştir.

## Sonuç
`tarot-fal` projesi, modern web standartlarına (App Router, Server/Client components, Server Actions) uygun olarak yapılandırılmış, tip güvenliğini uçtan uca sağlayan (Prisma & Zod), ölçeklenebilir ve sağlam bir altyapıya sahiptir. Çoklu dil (i18n) entegrasyonu başarıyla kurulmuş olup form yapılarından veritabanı seviyesine kadar tutarlı bir mimari izlenmektedir.
