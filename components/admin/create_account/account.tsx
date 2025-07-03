import { Button } from "@/components/ui/button";

const AccountCard = ({
  title,
  fields,
}: {
  title: string;
  fields: { label: string; name: string; type?: string }[];
}) => (
  <div className="w-full bg-page flex flex-col gap-6 p-6 rounded-xl shadow-md">
    <p className="font-merriweather text-dGreen text-xl font-bold text-center">
      {title.toUpperCase()}
    </p>
    <div className="flex flex-col gap-4">
      {fields.map((field) => (
        <div className="flex flex-col" key={field.name}>
          <label
            htmlFor={field.name}
            className="font-semibold text-dGreen font-merriweather"
          >
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type || "text"}
            className="h-10 px-3 text-base rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dGreen"
          />
        </div>
      ))}
    </div>
    <Button variant="mButton" className="w-full py-2 text-base rounded-lg mt-2">
      Create
    </Button>
  </div>
);

export const CreateAccount = () => {
  return (
    <div className="w-full h-auto overflow-auto flex justify-center px-4 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1000px] w-full h-[650px] md:h-[500px]">
        <AccountCard
          title="Registrar Account"
          fields={[
            { label: "Username", name: "registrarUsername" },
            { label: "Email", name: "registrarEmail", type: "email" },
          ]}
        />
        <AccountCard
          title="Cashier Account"
          fields={[
            { label: "Username", name: "cashierUsername" },
            { label: "Email", name: "cashierEmail", type: "email" },
          ]}
        />
        <AccountCard
          title="Teacher Account"
          fields={[
            { label: "Username", name: "teacherId" },
            { label: "Email", name: "teacherEmail", type: "email" },
          ]}
        />
      </div>
    </div>
  );
};
