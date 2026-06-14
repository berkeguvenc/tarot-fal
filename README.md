# 🚀 Master Boilerplate - Dinamik Randevu Sistemi

Bu proje; farklı markalar ve konseptler (örn: evcil hayvan bakımı, danışmanlık hizmetleri, fal/tarot vb.) için hızlıca özelleştirilebilir, çok dilli (i18n) ve modern bir randevu/rezervasyon sistemi şablonudur.

Temel bir "Upstream" (Ana Kaynak) deposu olarak kurgulanmıştır. Her yeni müşteri projesi bu depodan türetilir ve çekirdek güncellemeler tek merkezden yönetilerek tüm projelere dağıtılır.

---

## 🛠 Teknoloji Yığını (Tech Stack)

- **Framework:** Next.js 16 (App Router)
- **Veritabanı & ORM:** PostgreSQL, Prisma ORM (v7.8.0) + `@prisma/adapter-pg`
- **Stil & Kullanıcı Arayüzü:** Tailwind CSS v4, Shadcn/ui
- **Form & Validasyon:** React Hook Form, Zod
- **Çoklu Dil (i18n):** `next-i18n-router`, `react-i18next`, `i18next`
- **Dağıtım (Deployment):** Dokploy (Nixpacks / Node >= 22.12.0 veya Dockerfile)

---

## 📂 Klasör Mimarisi

Proje, uluslararasılaştırma (i18n) standartlarına tam uyumlu olacak şekilde yapılandırılmıştır:

```text
src/
├── app/
│   ├── [locale]/             # URL tabanlı dil yönlendirmesi (/tr, /en)
│   │   ├── (landing)/        # Müşteri arayüzü ve randevu sayfaları
│   │   ├── admin/            # Yönetim ve rezervasyon kontrol paneli
│   │   └── layout.tsx        # Dile duyarlı ana layout (Promise tabanlı params)
│   ├── api/                  # Backend servisleri ve rotalar
│   └── globals.css           # Tailwind v4 @theme ve Shadcn değişkenleri
├── components/               # Shadcn UI ve özel React bileşenleri
├── i18n/                     # Çeviri motoru konfigürasyonları
├── lib/                      # Prisma Singleton istemcisi ve yardımcı fonksiyonlar
├── locales/                  # Dil dosyaları (tr/common.json, en/common.json)
└── schemas/                  # Zod form doğrulama şemaları
```

---

## 🚀 Yerel Geliştirme (Local Development)

### 1. Gereksinimler
- Node.js >= 22.12.0 (Prisma 7.8.0 gereksinimidir)
- PostgreSQL veritabanı bağlantısı

### 2. Kurulum
```bash
npm install
```

### 3. Çevre Değişkenleri
Kök dizinde bir `.env` dosyası oluşturun ve veritabanı adresinizi girin:
```env
DATABASE_URL="postgresql://kullanici_adi:sifre@localhost:5432/veritabani_adi?schema=public"
```

### 4. Veritabanı ve Prisma Hazırlığı
```bash
npx prisma generate
npx prisma db push
```

*(Opsiyonel)* Test saat dilimlerini veritabanına yüklemek için:
```bash
npx prisma db seed
```

### 5. Uygulamayı Başlatma
```bash
npm run dev
```
Uygulama `http://localhost:3000` adresinde çalışmaya başlayacaktır.

---

## 🧬 Yeni Proje Türetme (Upstream İş Akışı)

Bu şablonu kullanarak yeni bir müşteri projesi başlatmak için aşağıdaki adımları sırasıyla terminalinizde çalıştırın:

### 1. Şablonu Klonlama ve Klasöre Geçiş
```bash
git clone https://github.com/KULLANICI_ADIN/master-boilerplate.git yeni-proje-adi
cd yeni-proje-adi
```

### 2. Git Bağlantılarını Yapılandırma
```bash
git remote rename origin upstream
git remote add origin https://github.com/KULLANICI_ADIN/yeni-proje-adi.git
```

### 3. Yeni Depoya İlk Kodları Gönderme
```bash
git push -u origin main
```

### 4. Çekirdek Şablondan Güncelleme Çekme
Gelecekte ana repoda (`master-boilerplate`) yapılan geliştirmeleri müşteri projelerine yansıtmak için:
```bash
git config pull.rebase false
git pull upstream main --allow-unrelated-histories
```
*(Varsa çakışmaları çözün ve `git push origin main` ile müşteri reponuzu güncelleyin).*

---

## 🎨 Markalaştırma ve Temalandırma

Projenin renklerini yeni bir markaya uyarlamak oldukça basittir. Tailwind v4 mimarisi sayesinde yalnızca `src/app/globals.css` içerisindeki `:root` HSL değerlerini değiştirmeniz yeterlidir.

```css
@layer base {
  :root {
    --primary: 142 71% 28%; /* Markanın Ana Rengi (Örn: Orman Yeşili) */
    --radius: 1rem;         /* Buton ve kartların köşe ovalliği */
  }
}
```

---

## 🌍 Çoklu Dil (i18n) Yönetimi

Metin güncellemeleri ve çeviriler `src/locales/` dizini altındaki JSON dosyalarından yönetilir:
- `src/locales/tr/common.json` (Türkçe Metinler)
- `src/locales/en/common.json` (İngilizce Metinler)

Next.js 16 App Router (Promise-based params) uyumlu sayfa içi örnek kullanımı:

```tsx
import initTranslations from "@/i18n";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { t } = await initTranslations(locale, ['common']);
  
  return <h1>{t('greeting')}</h1>;
}
```

---

## ☁️ Canlıya Alma (Dokploy Deployment)

Bu proje Dokploy platformunda çalışmak üzere optimize edilmiştir. `package.json` içerisindeki build betiği, derleme esnasında Prisma tablolarını otomatik güncelleyecek şekilde (`prisma generate && prisma db push && next build`) kurgulanmıştır.

### Dokploy Çevre Değişkenleri (Environment Variables)
Dokploy uygulamanızın Environment sekmesine aşağıdaki değişkenleri kesinlikle ekleyin:
- `DATABASE_URL` = *(Dokploy Internal PostgreSQL Bağlantı Adresi)*
- `NIXPACKS_NODE_VERSION` = `22.12.0` *(Prisma 7.8.0 uyumluluğu için Node 22.12+ zorunludur)*
- `NIXPACKS_INSTALL_CMD` = `npm ci --no-audit --no-fund`

### Önbelleksiz Dağıtım (Cache Kırma)
Node.js sürüm uyumsuzluklarını önlemek ve Prisma'nın sağlıklı derlenmesini sağlamak için, özellikle ilk dağıtımda **Deploy** butonunun yanındaki ok işaretine basarak **"Deploy without cache"** seçeneğini kullanın.