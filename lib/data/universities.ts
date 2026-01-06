// Daftar kampus populer untuk SNBT
// Data ini bisa di-fetch dari API PDDikti atau sumber lain jika diperlukan

export const universities = [
  // PTN TOP (UI, ITB, UGM, ITS, IPB)
  "Universitas Indonesia (UI)",
  "Institut Teknologi Bandung (ITB)",
  "Universitas Gadjah Mada (UGM)",
  "Institut Teknologi Sepuluh Nopember (ITS)",
  "Institut Pertanian Bogor (IPB)",
  
  // PTN Pulau Jawa
  "Universitas Airlangga (UNAIR)",
  "Universitas Brawijaya (UB)",
  "Universitas Diponegoro (UNDIP)",
  "Universitas Padjadjaran (UNPAD)",
  "Universitas Sebelas Maret (UNS)",
  "Universitas Pendidikan Indonesia (UPI)",
  "Universitas Negeri Yogyakarta (UNY)",
  "Universitas Negeri Semarang (UNNES)",
  "Universitas Negeri Malang (UM)",
  "Universitas Negeri Jakarta (UNJ)",
  "Universitas Negeri Surabaya (UNESA)",
  "Universitas Jember (UNEJ)",
  "Universitas Trunojoyo Madura (UTM)",
  "Universitas Islam Negeri Sunan Kalijaga Yogyakarta",
  "Universitas Islam Negeri Syarif Hidayatullah Jakarta",
  "Universitas Islam Negeri Sunan Ampel Surabaya",
  "Universitas Islam Negeri Walisongo Semarang",
  "Universitas Sultan Ageng Tirtayasa (UNTIRTA)",
  "Universitas Tidar",
  
  // PTN Sumatera
  "Universitas Sumatera Utara (USU)",
  "Universitas Andalas (UNAND)",
  "Universitas Sriwijaya (UNSRI)",
  "Universitas Riau (UNRI)",
  "Universitas Syiah Kuala (UNSYIAH)",
  "Universitas Lampung (UNILA)",
  "Universitas Jambi (UNJA)",
  "Universitas Bengkulu (UNIB)",
  "Universitas Bangka Belitung (UBB)",
  "Universitas Maritim Raja Ali Haji (UMRAH)",
  "Universitas Negeri Padang (UNP)",
  "Universitas Negeri Medan (UNIMED)",
  "Universitas Islam Negeri Imam Bonjol Padang",
  "Universitas Islam Negeri Sumatera Utara",
  "Universitas Islam Negeri Raden Fatah Palembang",
  
  // PTN Kalimantan
  "Universitas Mulawarman (UNMUL)",
  "Universitas Lambung Mangkurat (ULM)",
  "Universitas Tanjungpura (UNTAN)",
  "Universitas Palangka Raya (UPR)",
  "Universitas Borneo Tarakan (UBT)",
  
  // PTN Sulawesi
  "Universitas Hasanuddin (UNHAS)",
  "Universitas Sam Ratulangi (UNSRAT)",
  "Universitas Tadulako (UNTAD)",
  "Universitas Halu Oleo (UHO)",
  "Universitas Negeri Makassar (UNM)",
  "Universitas Negeri Gorontalo (UNG)",
  "Universitas Negeri Manado",
  "Universitas Sulawesi Barat (UNSULBAR)",
  "Universitas Khairun Ternate",
  
  // PTN Bali & Nusa Tenggara
  "Universitas Udayana (UNUD)",
  "Universitas Mataram (UNRAM)",
  "Universitas Nusa Cendana (UNDANA)",
  "Universitas Warmadewa",
  "Universitas Pendidikan Ganesha (UNDIKSHA)",
  
  // PTN Papua & Maluku
  "Universitas Cenderawasih (UNCEN)",
  "Universitas Papua",
  "Universitas Pattimura (UNPATTI)",
  
  // Politeknik Negeri
  "Politeknik Elektronika Negeri Surabaya (PENS)",
  "Politeknik Negeri Jakarta (PNJ)",
  "Politeknik Negeri Bandung (POLBAN)",
  "Politeknik Negeri Semarang (POLINES)",
  "Politeknik Negeri Malang (POLINEMA)",
  "Politeknik Negeri Medan (POLMED)",
  "Politeknik Negeri Bali (PNB)",
  "Politeknik Negeri Ujung Pandang (PNUP)",
  "Politeknik Negeri Padang (PNP)",
  "Politeknik Negeri Batam (POLIBATAM)",
  "Politeknik Manufaktur Negeri Bandung (POLMAN)",
  "Politeknik Perkapalan Negeri Surabaya (PPNS)",
  "Politeknik Statistika STIS",
  
  // PTS Ternama
  "Universitas Telkom",
  "Universitas Bina Nusantara (BINUS)",
  "Universitas Trisakti",
  "Universitas Tarumanagara (UNTAR)",
  "Universitas Atma Jaya Jakarta",
  "Universitas Katolik Indonesia Atma Jaya",
  "Universitas Kristen Petra",
  "Universitas Pelita Harapan (UPH)",
  "Universitas Esa Unggul",
  "Institut Teknologi Telkom Purwokerto",
  "Universitas Multimedia Nusantara (UMN)",
  "Universitas Prasetiya Mulya",
  "Institut Teknologi Harapan Bangsa",
  "Universitas Mercu Buana",
  "Universitas Gunadarma",
  "Universitas Pancasila",
  "Universitas Muhammadiyah Jakarta",
  "Universitas Islam Indonesia (UII)",
  "Universitas Muhammadiyah Yogyakarta (UMY)",
  "Universitas Ahmad Dahlan (UAD)",
  "Universitas Muhammadiyah Surakarta (UMS)",
  "Universitas Muhammadiyah Malang (UMM)",
  "Universitas Muhammadiyah Surabaya (UM Surabaya)",
  "Universitas Kristen Satya Wacana (UKSW)",
  "Universitas Sanata Dharma",
  "Universitas Dian Nuswantoro (UDINUS)",
  "Universitas Kristen Duta Wacana (UKDW)",
  "Universitas Pembangunan Nasional Veteran Jakarta",
  "Universitas Pembangunan Nasional Veteran Yogyakarta",
  "Universitas Pembangunan Nasional Veteran Jawa Timur",
  "Universitas Katolik Parahyangan (UNPAR)",
  "Universitas Kristen Maranatha",
  "Universitas Islam Bandung (UNISBA)",
  "Universitas Pasundan",
  "Universitas Widyatama",
  "President University",
  "Swiss German University (SGU)",
  "Universitas Ciputra",
  "Institut Sains dan Teknologi Terpadu Surabaya",
  "Universitas Surabaya (UBAYA)",
  "Universitas Katolik Widya Mandala Surabaya",
  "Universitas 17 Agustus 1945 Surabaya",
  "Institut Teknologi Adhi Tama Surabaya (ITATS)",
  "Universitas Narotama",
  "Universitas Bhayangkara Surabaya",
  "Sekolah Tinggi Ilmu Statistik (STIS)",
  "Sekolah Tinggi Teknologi Bandung (STTB)",
  "Institut Teknologi Del",
  "Universitas Ma Chung",
  "Universitas Sebelas April Sumedang",
];

// Fungsi untuk fetch dari API PDDikti
export async function fetchUniversitiesFromAPI(): Promise<string[]> {
  try {
    // API PDDikti untuk mendapatkan daftar perguruan tinggi
    const response = await fetch('https://api-frontend.kemdikbud.go.id/hit_mhs/pt');
    
    if (!response.ok) {
      throw new Error('Failed to fetch universities');
    }
    
    const data = await response.json();
    
    // Mapping data dari API ke format yang kita butuhkan
    // Biasanya API mengembalikan array dengan struktur {nama_pt, id_pt, dll}
    const universityList = data.map((item: any) => item.nama_pt || item.name)
      .filter((name: string) => name) // Filter yang kosong
      .sort(); // Urutkan alfabetis
    
    return universityList;
  } catch (error) {
    console.error('Error fetching universities from API:', error);
    // Fallback ke data static jika API gagal
    return universities;
  }
}

// Fungsi alternatif untuk search/filter perguruan tinggi dari API
export async function searchUniversities(query: string): Promise<string[]> {
  try {
    if (!query || query.length < 2) {
      return universities.slice(0, 50); // Return top 50 dari static data
    }
    
    // Bisa gunakan API search PDDikti jika ada
    // Untuk sekarang filter dari data static dulu
    const filtered = universities.filter(uni => 
      uni.toLowerCase().includes(query.toLowerCase())
    );
    
    return filtered.slice(0, 50); // Limit 50 hasil
  } catch (error) {
    console.error('Error searching universities:', error);
    return universities.slice(0, 50);
  }
}
