import {
  Logo,
  Title,
  Error,
  Button,
  SpinnerLoader,
  Link,
  Toasts,
  Icon,
} from '@/components';
import { useAuth } from '@/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Navigate } from 'react-router-dom';
import { LoginData } from '../../types/typings.t';
import { Toaster } from 'react-hot-toast';
import { LoginSVG } from '@/assets';

const Login = () => {
  /**
   * page states
   */
  const { isLogging, token, loginMutateAsync } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    mode: 'onTouched',
  });

  /**
   * page functions
   */
  const onSubmit: SubmitHandler<LoginData> = ({ email, password }) => {
    loginMutateAsync({ email, password });
  };

  if (token) return <Navigate to='/' replace />;

  return (
    <section className='h-fit xs:h-fit lg:h-[39rem] flex justify-center flex-col items-center'>
      {/*  into section */}
      <div className='w-full px-6 lg:w-full h-fit'>
        {/* the login details */}
        <div className='flex flex-col justify-between lg:flex-row  lg:gap-2 lg:items-center h-full'>
          <div className='h-fit  flex flex-col gap-2'>
            <div className='mb-5'>
              <Title title='Login' titleStyles='text-lg' />
            </div>

            <p className='rounded-full bg-callToAction/10 w-fit px-3 py-1 text-xs flex gap-2 items-center justify-center leading-loose text-white'>
              Login to gain access to our services for free.
            </p>
            <img
              src={LoginSVG}
              alt=''
              className='h-[15rem] w-full bg-callToAction rounded-[2rem]'
            />
          </div>

          <form
            className='py-2 flex-1 lg:h-full lg:pt-[9rem] flex flex-col justify-center '
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='flex flex-col gap-y-5 rounded-[2rem] py-6 px-2 bg-secondary lg:mt-12'>
              <div className='relative'>
                <input
                  type='email'
                  {...register('email', {
                    required: 'Your email is required.',
                  })}
                  className='input peer'
                  placeholder='Email'
                />
                <label className='inputLabel'>Email</label>

                {errors['email'] && (
                  <ErrorMessage
                    errors={errors}
                    name='email'
                    render={({ message }) => <Error errorMessage={message} />}
                  />
                )}
              </div>

              <div className='relative'>
                <input
                  type='password'
                  {...register('password', {
                    required: 'Enter your password.',
                  })}
                  className='input peer'
                  placeholder='Password'
                />
                <label className='inputLabel'>Password</label>

                {errors['password'] && (
                  <ErrorMessage
                    errors={errors}
                    name='password'
                    render={({ message }) => <Error errorMessage={message} />}
                  />
                )}
              </div>
            </div>

            <div className='flex justify-end mt-2'>
              <Button
                title={
                  isLogging ? <SpinnerLoader color='fill-white' /> : 'Login'
                }
                type='submit'
                intent='primary'
                fullWidth={false}
              />
            </div>

            <div className='flex flex-col items-center mt-3'>
              {/* <Link
                route={{ to: '/forgot-password', name: 'Forgot Password?' }}
                type='link'
                fullWidth={false}
              /> */}

              <div className='flex items-center gap-4'>
                <span>Don&lsquo;t have an account yet?</span>
                <Link
                  route={{ to: '/auth/register', name: 'Sign Up' }}
                  type='link'
                  fullWidth={false}
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Toaster */}
      <Toaster />
    </section>
  );
};

export default Login;
