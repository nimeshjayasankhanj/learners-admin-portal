import { UseFormRegister } from "react-hook-form";

export type SignInDTO = {
    email: string;
    password: string;
}

export type SignInFormDTO = {
    handleSubmit: () => void;
    errors: any;
    register: UseFormRegister<SignInDTO>;
    customError: string;
    isPending: boolean
}