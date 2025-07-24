import AuthForm from '@/components/AuthForm';

export const metadata = {
  title: 'Вход в PlaceReview',
  description: 'Войдите в свой аккаунт, чтобы добавлять отзывы о местах',
};

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <AuthForm type="login" />
      </div>
    </div>
  );
}