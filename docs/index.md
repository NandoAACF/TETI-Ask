# **TETI Ask - Senior Project DTETI**

## **Kelompok Numero Uno**

**Ketua Kelompok:** Agustinus Angelo Christian Fernando - 21/473804/TK/52235

**Anggota 1:** Agustinus Angelo Christian Fernando - 21/473804/TK/52235

**Anggota 2:** Axel Xaverius Tamtama - 21/479414/TK/52892

**Anggota 3:** Nikolas Galih Saputro Anugrah Utomo - 21/482747/TK/53361

# **Modul 1**

**Instansi:** DTETI FT UGM Yogyakarta

## **Nama dan Jenis Produk**
**Nama Produk:** TETI Ask 

**Jenis produk:** Web Based Chatbot

## **Latar Belakang & Permasalahan** 

Mahasiswa masih seringkali bingung mengenai di mana harus mengakses suatu informasi terkait perkuliahan di DTETI. Sumber informasi yang tersedia pun masih terpisah-pisah. Bingungnya mencari suatu informasi tentunya menyebabkan waktu terbuang sia-sia sehingga menjadi hal yang tidak efektif.

Oleh karena itu, kami ingin membuat suatu web app yang menerapkan chatbot agar mahasiswa bisa bertanya suatu hal tentang TETI menggunakan bahasa sehari-hari dengan sangat mudah dan cepat untuk mendapatkan jawabannya. Hal ini tentunya dapat menghemat waktu mahasiswa dalam mencari suatu informasi yang dibutuhkan.

## **Rumusan Permasalahan**
- Bagaimana mahasiswa bisa mendapatkan informasi seputar DTETI dengan cepat dan sesuai kebutuhan?

- Bagaimana mahasiswa dapat mengakses informasi seputar DTETI di mana pun tanpa ada harus menginstall software tertentu?

- Bagaimana mahasiswa bisa mendapatkan informasi seputar DTETI kapan pun di luar jam kerja?

## **Penjelasan Solusi Produk**
TETI Ask adalah chatbot yang dapat menjawab semua pertanyaan Anda terkait DTETI FT UGM. 

Mahasiswa bisa bertanya apapun tentang DTETI menggunakan bahasa sehari-hari dengan sangat mudah dan cepat untuk mendapatkan jawabannya. Selain chatbot, kita juga akan membuat web yang berisi FAQ, dokumen, dan hal-hal penting terkait DTETI. Hal ini tentunya dapat menghemat waktu mahasiswa dalam mencari suatu informasi yang dibutuhkan.

TETI Ask berwujud web berbasis chatbot. Model AI Chatbot akan memanfaatkan cloud, yaitu Azure OpenAI. Jaringan komputer akan dimanfaatkan ketika melakukan deploy web app ini.

## **Fitur**
- **Chatbot:** Dapat menjawab semua pertanyaan pengguna yang berkaitan dengan informasi seputar DTETI FT UGM secara akurat dan cepat.
- **FAQ DTETI:** Berisikan hal-hal seputar DTETI yang paling sering ditanyakan oleh mahasiswa.
- **Histori pertanyaan:** Mahasiswa dapat mengakses chat yang sebelumnya pernah user lakukan dengan chatbot ini.
- **Dokumen Penting:** Berisikan daftar dokumen-dokumen penting yang dibutuhkan oleh mahasiswa DTETI.

## **Analisis Kompetitor**
- **AILABOT**
  - **Jenis kompetitor:** Direct
  - **Jenis produk:** Aplikasi chatbot
  - **Target customer:** Mahasiswa UNILAK
  - **Kelebihan**
    - Berisi informasi yang lengkap terkait kampus, mulai dari alamat hingga bagaimana cara mendaftar di kampus tersebut.
    - Dapat memberikan akses yang cepat untuk mahasiswa mendapatkan informasi terkait kampus
  - **Kekurangan**
    - Memerlukan sumber daya hardware yang mumpuni karena berjalan di local
    - Masih berjalan local sehingga diperlukan proses instalasi
  - **Key Competitive:** Kunci kompetisi dari projek kami adalah berbasis web sehingga pengguna bisa memiliki kelonggaran dalam memilih gawai yang digunakan untuk mengakses projek kami tanpa harus takut adanya hambatan sumber daya hardware dan tidak perlu repot untuk menginstall aplikasi tambahan.

- **Chatbot Lintang UGM**
  - **Jenis kompetitor:** Tertiary Competitors
  - **Jenis produk:** Web App
  - **Target customer:** Mahasiswa UGM
  - **Kelebihan**
    - Ada emoji sehingga lebih interaktif
    - Cukup simpel
  - **Kekurangan**
    - Masih belum akurat
    - Jawaban kadang tidak sesuai dengan pertanyaan
    - UI masih kurang bagus
  - **Key Competitive:**
    - Chatbot yang kita buat bisa lebih akurat karena menggunakan layanan cloud Azure OpenAI yang sudah dilatih sedemikian rupa oleh Microsoft.
    - Design UI yang kita buat bisa lebih modern dan intuitif sehingga lebih nyaman digunakan oleh pengguna.

- **Chatbot LUIS**
    - **Jenis Kompetitor:** Direct
    - **Jenis produk:** Embed pada web Sarjana DTETI
    - **Target customer:** Mahasiswa DTETI
    - **Kelebihan**
      - Mudah diakses karena langsung di web Sarjana DTETI
    - **Kekurangan**
      - Sudah tidak bisa digunakan
      - Kurang interaktif
      - Loading cukup lama
    - **Key Competitive:**
      - Pemrosesan pertanyaan bisa lebih cepat dan loading tidak memakan banyak waktu
      - Lebih interaktif dan tidak bergantung pada web Sarjana DTETI sehingga performanya pun bisa lebih baik


# **Modul 2**

## **Metodologi SDLC**

**Metodologi yang digunakan:** Agile

## **Alasan pemilihan Agile**

Kami memilih metode agile karena iterasi berlangsung dengan cepat sehingga kita bisa mengembangkan fungsionalitas chatbot dengan kualitas yang semakin baik dari waktu ke waktu. 

Selain itu, agile fleksibel terhadap perubahan. Dengan begitu, maka tim memiliki kemampuan untuk menyesuaikan fungsionalitas chatbot sesuai dengan kebutuhan para pengguna dengan cepat dan tidak harus mengulang semuanya dari awal.

Pengembangan pada metode agile dilakukan secara bertahap. Hal ini menyebabkan kita bisa merilis fungsionalitas sedikit demi sedikit sehingga jika ada bug bisa masih mudah untuk diatasi.

Kualitas produk juga akan jauh lebih baik karena produk akan terus disempurnakan pada setiap siklus pengembangan sesuai dengan hasil testing dan feedback yang didapatkan.

## **Tujuan Produk**
Membuat chatbot yang dapat menjawab semua pertanyaan Anda terkait DTETI FT UGM. Mahasiswa, dosen, dan tendik bisa bertanya apapun tentang DTETI menggunakan bahasa sehari-hari dengan sangat mudah dan cepat untuk mendapatkan jawabannya. Selain chatbot, kita juga akan membuat web yang berisi FAQ, dokumen, dan hal-hal penting terkait DTETI. 

Hal ini tentunya dapat menghemat waktu mahasiswa dalam mencari suatu informasi yang dibutuhkan. Tidak hanya chatbot, tapi kami juga menyediakan sebuah web yang menyediakan segala informasi terkait DTETI.

## **Pengguna potensial**
Mahasiswa, dosen, dan tenaga pendidik di DTETI FT UGM yang sedang membutuhkan suatu informasi terkait DTETI.

## **Use Case Diagram**
![Use Case Diagram](images/usecase.png)

## **Functional Requirements**
![FR Table](images/fr.png)

## **Entity Relationship Diagram**
![ERD](images/erd.png)

## **Low Fidelity Wireframe**
![Low Fidelity Wireframe](images/lofi.png)

## **Gantt-Chart**
![Gantt Chart](images/gantt.png)