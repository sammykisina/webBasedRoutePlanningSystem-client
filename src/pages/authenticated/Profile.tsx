import {
  Button,
  Error,
  Icon,
  Link,
  SpinnerLoader,
  TabTitle,
  Title,
} from '@/components';
import { useAuth } from '@/hooks';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { PasswordUpdate } from '../../types/typings.t';
import { useState } from 'react';
import { HiEye, HiEyeSlash, HiOutlineArrowLongRight } from 'react-icons/hi2';
import { NavLink, useNavigate } from 'react-router-dom';

const Profile = () => {
  /**
   * component states
   */
  const authHook = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<PasswordUpdate>({
    mode: 'onTouched',
  });
  const password = watch('password');

  /**
   * component functions
   */
  const onSubmit: SubmitHandler<PasswordUpdate> = async ({ password }) => {
    await authHook?.updatePasswordMutateAsync({
      userId: authHook?.user?.id!,
      password: password,
    });

    reset({
      password: '',
      confirmPassword: '',
    });

    setShowPassword(false);
  };

  return (
    <section className='flex flex-col h-full xs:h-[40rem] lg:h-[39rem] rounded-[2rem] gap-2 duration-300'>
      {/* title */}
      <TabTitle title='Profile' />

      {authHook?.token ? (
        <div className='flex justify-center items-center flex-col gap-2 rounded-[2rem]  shadow-md bg-secondary py-4 px-2'>
          <div className='flex flex-col gap-5 w-full md:w-[30rem] lg:w-[35rem] border p-2 rounded-[1rem] divide-y'>
            {/* title */}
            <TabTitle title='General Information.' />

            <div className='p-2'>
              <div className='flex flex-col relative'>
                <span className='whitespace-nowrap'>
                  {authHook.userProfile?.attributes?.name}
                </span>
                <span>{authHook.userProfile?.attributes?.email}</span>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-5 w-full md:w-[30rem] lg:w-[35rem] border p-2 rounded-[1rem] divide-y'>
            {/* title */}
            <TabTitle title='Update Password.' />

            <div className='flex justify-center '>
              <form
                className='w-full space-y-1 rounded-[2rem] p-6'
                onSubmit={handleSubmit(onSubmit)}
              >
                <Title title='UPDATE YOUR PASSWORD' titleStyles='text-lg' />
                <section className='flex w-full flex-col gap-4 py-3'>
                  <div className='flex items-center gap-2'>
                    <div className='relative flex-1'>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', {
                          required: 'Password is required',
                          minLength: {
                            value: 8,
                            message: 'Minimum required length is 8 characters',
                          },
                        })}
                        className='input peer'
                        placeholder='Password'
                      />
                      <label className='inputLabel'>Password</label>

                      {errors['password'] && (
                        <ErrorMessage
                          errors={errors}
                          name='password'
                          render={({ message }) => (
                            <Error errorMessage={message} />
                          )}
                        />
                      )}
                    </div>

                    <Icon
                      purpose={() => setShowPassword((prev) => !prev)}
                      icon={
                        showPassword ? (
                          <HiEyeSlash className='text-textColor' />
                        ) : (
                          <HiEye className='text-textColor' />
                        )
                      }
                    />
                  </div>

                  <div className='flex items-center gap-2'>
                    <div className='relative flex-1'>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        {...register('confirmPassword', {
                          required: 'confirm password is required',
                          validate: (value) =>
                            value === password || 'Password do not march',
                        })}
                        className='input peer'
                        placeholder='Confirm Password'
                      />
                      <label className='inputLabel'>Confirm Password</label>

                      {errors['confirmPassword'] && (
                        <ErrorMessage
                          errors={errors}
                          name='confirmPassword'
                          render={({ message }) => (
                            <Error errorMessage={message} />
                          )}
                        />
                      )}
                    </div>

                    <Icon
                      purpose={() => setShowPassword((prev) => !prev)}
                      icon={
                        showPassword ? (
                          <HiEyeSlash className='text-textColor' />
                        ) : (
                          <HiEye className='text-textColor' />
                        )
                      }
                    />
                  </div>
                </section>

                <div className='flex justify-end'>
                  <Button
                    title={
                      authHook?.isUpdatingPassword ? (
                        <SpinnerLoader color='fill-white' />
                      ) : (
                        'Update'
                      )
                    }
                    type='submit'
                    intent='primary'
                    fullWidth={false}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center flex-col gap-2 rounded-[2rem] h-full  shadow-md bg-secondary py-4 px-2'>
          Please Login To Access This Page
          <NavLink to='/auth/login' className='w-fit'>
            <div className='btn'>
              <span>Login</span>

              <Icon icon={<HiOutlineArrowLongRight className='btnIcon' />} />
            </div>
          </NavLink>
        </div>
      )}
    </section>
  );
};

export default Profile;
