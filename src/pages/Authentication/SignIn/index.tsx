import Form from './Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignInDTO } from '../../../types/authentication';
import { useMutation } from '@tanstack/react-query';
import { loginService } from '../../../services/auth';
import { useState } from 'react';
import { loginSchema } from '../../../schema/authentication';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [customError, setCustomError] = useState<string>('');
    const navigation = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { email: '', password: '' },
        resolver: yupResolver(loginSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: loginService,
        onSuccess: (res) => {
            if (res.status === 400) {
                setCustomError(res.data.message);
            }
            if (res.status === 200) {
                navigation('/dashboard')
            }
        },
        onError: (err: any) => {
            console.log(err);
        },
    });

    const onSubmit = (data: SignInDTO) => {
        // const { mutate } = usePostData;
        mutate(data);
    };

    return (
        <Form
            handleSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            customError={customError}
            isPending={isPending}
        />
    );
};

export default SignIn;
