// Backend API - Team Members Data
import { NextResponse } from 'next/server';

export interface TeamMember {
  id: number;
  name: string;
  role?: string;
  major: string;
  image: string;
}

// Database/Static data untuk team members
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Aqila Wisam Madani M',
    role: 'Developer',
    major: 'D4 Teknik Informatika 24',
    image: '/team/Wisam-Foto.png'
  },
  {
    id: 2,
    name: 'Zelcy Wiluarta',
    role: 'UI/UX Designer',
    major: 'D4 Teknik Komputer 24',
    image: '/team/zelcy-foto.png'
  },
  {
    id: 3,
    name: 'Bima Adji Kusuma',
    major: 'D4 Teknik Komputer 24',
    image: '/team/Bima-foto.png'
  },
  {
    id: 4,
    name: 'Robby Arsani Fiorentino',
    major: 'D4 Teknik Komputer 23',
    image: '/team/robby-foto.png'
  },
  {
    id: 5,
    name: 'Luthfi Zadeh',
    major: 'D3 Teknik Informatika 23',
    image: '/team/luthfi-zadeh.jpg'
  },
  {
    id: 6,
    name: 'Muhammad Haris Evan Dinata',
    major: 'D3 Teknik Informatika 25',
    image: '/team/Evan-foto.png'
  },
  {
    id: 7,
    name: 'Nadia',
    major: 'D3 Teknik Informatika 25',
    image: '/team/nadia.jpg'
  },
  {
    id: 8,
    name: 'Attini',
    major: 'D4 Teknik Telekomunikasi 25',
    image: '/team/attini.jpg'
  }
];

// GET endpoint untuk mendapatkan semua team members
export async function GET() {
  try {
    // Simulate database query delay (optional)
    // await new Promise(resolve => setTimeout(resolve, 100));

    return NextResponse.json({
      success: true,
      data: teamMembers,
      total: teamMembers.length
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch team members'
      },
      { status: 500 }
    );
  }
}

// Optional: GET single team member by ID
export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    
    const member = teamMembers.find(m => m.id === id);
    
    if (!member) {
      return NextResponse.json(
        {
          success: false,
          error: 'Team member not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: member
    });
  } catch (error) {
    console.error('Error fetching team member:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch team member'
      },
      { status: 500 }
    );
  }
}
