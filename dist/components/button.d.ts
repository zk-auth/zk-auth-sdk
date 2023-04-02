/// <reference types="react" />
export declare type SignInWithZkAuthButtonProps = {
    onSuccess: () => void;
    onError?: (error: any) => void;
};
declare const SignInWithZkAuthButton: ({ onSuccess, onError, }: SignInWithZkAuthButtonProps) => JSX.Element;
export default SignInWithZkAuthButton;
