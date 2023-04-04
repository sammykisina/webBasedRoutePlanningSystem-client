import { useAuth } from '@/hooks';
import {
  Button,
  Error,
  Link,
  SpinnerLoader,
  TabTitle,
  Title,
  Toasts,
} from '@/components';

const Profile = () => {
  /**
   * component states
   */
  const {
    user,
    isFetchingLecturerProfile,
    isFetchingStudentProfile,
    studentProfile,
    lecturerProfile,
    token,
    isUpdatingPassword,
    updatePasswordMutateAsync,
  } = useAuth();

  const profile = user?.role === 'student' ? studentProfile : lecturerProfile;

  /**
   * component functions
   */
  return (
    <section className={`w-[20rem] py-2 px-3 flex flex-col gap-2 divide-y `}>
      {/* title */}
      <div>
        <TabTitle title='Your Profile' />
      </div>

      {token ? (
        <div className='p-2 flex flex-col'>
          <span className='whitespace-nowrap'>{profile?.attributes?.name}</span>
          <span>{profile?.attributes?.email}</span>

          {/* update password */}
          {/* <div className='mt-6 flex justify-center '>
            <form
              className='w-full space-y-1 rounded-[2rem] p-6'
              onSubmit={handleSubmit(onSubmit)}
            >
              <Title title='UPDATE YOUR PASSWORD' titleStyles='text-lg' />
              <section className='flex w-full flex-col gap-4 py-3'>
                <div className='relative'>
                  <input
                    type='password'
                    {...register('password')}
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

                <div className='relative'>
                  <input
                    type='password'
                    {...register('confirm')}
                    className='input peer'
                    placeholder='Confirm Password'
                  />
                  <label className='inputLabel'>Confirm Password</label>

                  {errors['confirm'] && (
                    <ErrorMessage
                      errors={errors}
                      name='confirm'
                      render={({ message }) => <Error errorMessage={message} />}
                    />
                  )}
                </div>
              </section>

              <div className='flex justify-end'>
                <Button
                  title={
                    isUpdatingPassword ? (
                      <SpinnerLoader color='fill-white' />
                    ) : (
                      'Update'
                    )
                  }
                  type='submit'
                  intent='primary'
                />
              </div>
            </form>
          </div> */}
        </div>
      ) : (
        <div className='p-1'>
          <Link
            route={{
              to: '/auth/login',
              name: 'Login',
            }}
            type='link'
          />
        </div>
      )}
    </section>
  );
};

export default Profile;
