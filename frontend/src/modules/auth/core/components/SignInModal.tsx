import GoogleLogo from '@/assets/google.svg?react';
import MicrosoftLogo from '@/assets/microsoft.svg?react';
import { Button } from '@/modules/core/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/modules/core/ui/dialog';
import { Link } from '@/modules/core/ui/link';
import { LogoExtended } from '@/modules/core/ui/logoExtended';
import { getLoginURL } from '@/modules/auth/core/lib/client';
import { OAuthProvidersName } from '@/modules/auth/core/lib/oauthProvider';

export default function SignInModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Iniciar sesión</Button>
      </DialogTrigger>
      <DialogContent className="p-10 gap-y-14">
        <DialogHeader className="flex flex-col items-center gap-y-4">
          <DialogTitle className="inline-flex items-center gap-x-2">
            <LogoExtended size="lg" />
          </DialogTitle>
          <DialogDescription>
            Ingresa a tu cuenta y revisa tus matrículas
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          <Link
            variant="secondary"
            href={getLoginURL(OAuthProvidersName.GOOGLE)}
          >
            <GoogleLogo className="size-4" />
            Google
          </Link>
          <Link
            variant="secondary"
            href={getLoginURL(OAuthProvidersName.MICROSOFT)}
          >
            <MicrosoftLogo className="size-4" />
            Microsoft
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
