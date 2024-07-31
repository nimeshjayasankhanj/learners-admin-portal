import LoginSvg from '../../../images/auth/login.svg';
import { SignInFormDTO } from '../../../types/authentication';

const Form = ({ handleSubmit, register, errors, customError, isPending }: SignInFormDTO) => {
    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-8 ml-8 mr-8">
            <div className="flex flex-wrap items-center">
                <div className="hidden w-full xl:block xl:w-1/2">
                    <div className="py-17.5 px-26 text-center">
                        <span className="mt-15 inline-block">
                            <img src={LoginSvg} alt="Brand" />
                        </span>
                    </div>
                </div>

                <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                    <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                            Sign In to
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="mb-2.5 block font-medium text-black dark:text-white">
                                    Email <span className='text-red-500'>*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        {...register('email')}
                                        placeholder="Enter your email"
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                    <span className='text-red-500'>{errors.email?.message}</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="mb-2.5 block font-medium text-black dark:text-white">
                                    Password <span className='text-red-500'>*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        {...register('password')}
                                        placeholder="Enter your password"
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                    <span className='text-red-500'>{errors.password?.message}</span>
                                </div>
                            </div>

                            <div className="mb-5">
                                <p>{customError}</p>
                                <input
                                    type="submit"
                                    value="Sign In"
                                    disabled={isPending}
                                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;
