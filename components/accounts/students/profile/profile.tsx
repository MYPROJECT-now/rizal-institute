import { studentProfile } from "@/src/actions/studentAction";

// type StudentProfile = {
//   studentLastName: string;
//   studentFirstName: string;
//   studentMiddleName?: string | null;
//   studentSuffix?: string | null;
//   lrn: string;
//   religion?: string;
//   ip?: string | null;
//   motherTounge?: string;
//   house_no_purok?: string;
//   barangay?: string;
//   city?: string;
//   province?: string;
//   studentGender: string;
//   studentBirthDate: string;
//   gradeToEnroll?: string | null;
//   email?: string | null;
//   mobileNumber?: string | null;
//   guardiansLastName?: string | null;
//   guardiansFirstName?: string | null;
//   guardiansMiddleName?: string | null;
//   guardiansSuffix?: string | null;
//   emergencyContact?: string | null;
//   relationship?: string | null;
// };

// ✅ Utility function to calculate age from birth date
function calculateAge(birthDateStr: string): number {
  const birthDate = new Date(birthDateStr);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) age--;
  return age;
}

export default async function ProfilePage() {
  const profile = await studentProfile();

  if (!profile)
    return (
      <div className="p-6 text-center text-red-500">
        No student profile found.
      </div>
    );

  // ✅ Compute age automatically from date of birth
  const computedAge = calculateAge(profile.studentBirthDate);

  return (
    <div className="p-6 w-full h-full space-y-5">
      {/* PERSONAL INFO */}
      <Section title="Personal Information">
        <Grid>
          <Info
            label="Name"
            value={`${profile.studentFirstName} ${profile.studentMiddleName ?? ""} ${profile.studentLastName} ${profile.studentSuffix ?? ""}`}
          />
          <Info label="LRN" value={profile.lrn} />
          <Info label="Gender" value={profile.studentGender} />
          <Info label="Birth Date" value={profile.studentBirthDate} />
          <Info label="Age" value={computedAge.toString()} />
          <Info label="Religion" value={profile.religion ?? "-"} />
          <Info label="Ethnic Group" value={profile.ip ?? "-"} />
          <Info label="Mother Tongue" value={profile.motherTounge ?? "-"} />
        </Grid>
      </Section>

      {/* ADDRESS */}
      <Section title="Address">
        <Grid>
          <Info label="House / Purok / Street" value={profile.house_no_purok ?? "-"} />
          <Info label="Barangay" value={profile.barangay ?? "-"} />
          <Info label="City" value={profile.city ?? "-"} />
          <Info label="Province" value={profile.province ?? "-"} />
        </Grid>
      </Section>

      {/* ACADEMIC INFO */}
      <Section title="Academic Information">
        <Grid>
          <Info label="Grade Level" value={profile.gradeToEnroll ?? "-"} />
          <Info label="Section" value={profile.sectionName ?? "-"} />
        </Grid>
      </Section>

      {/* CONTACT INFO */}
      <Section title="Contact Information">
        <Grid>
          <Info label="Email" value={profile.email ?? "-"} />
          <Info label="Mobile Number" value={profile.mobileNumber ?? "-"} />
        </Grid>
      </Section>

      {/* GUARDIAN INFO */}
      <Section title="Guardian Information">
        <Grid>
          <Info
            label="Guardian Name"
            value={`${profile.guardiansFirstName ?? ""} ${profile.guardiansMiddleName ?? ""} ${profile.guardiansLastName ?? ""} ${profile.guardiansSuffix ?? ""}`}
          />
          <Info label="Emergency Contact" value={profile.emergencyContact ?? "-"} />
          <Info label="Relationship" value={profile.relationship ?? "-"} />
        </Grid>
      </Section>
    </div>
  );
}

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white shadow-md rounded-lg p-4">
    <h2 className="text-lg font-semibold mb-3 text-dGreen">{title}</h2>
    {children}
  </div>
);

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
);

const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col border border-green-200 rounded-md p-2 bg-green-50">
    <span className="text-xs text-gray-500">{label}</span>
    <span className="text-sm font-medium text-gray-800">{value || "-"}</span>
  </div>
);
