import { LoginOption } from "../constants/loginOptions";
import { LoginRole } from "@/src/types/auth/login.types";

type RoleSelectorProps = {
  activeRole: LoginRole;
  options: LoginOption[];
  onRoleChange: (role: LoginRole) => void;
};

export function RoleSelector({ activeRole, options, onRoleChange }: RoleSelectorProps) {
  return (
    <div
      className="grid rounded-lg bg-slate-100 p-1"
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      {options.map((option) => {
        const isActive = option.role === activeRole;

        return (
          <button
            className={`h-10 rounded-md text-sm font-semibold transition ${
              isActive
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-500 hover:text-slate-950"
            }`}
            key={option.role}
            onClick={() => onRoleChange(option.role)}
            type="button"
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
