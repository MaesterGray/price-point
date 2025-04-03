<script lang="ts">
    import type { PageData } from './$types';
    import { Button } from '$lib/components/ui/button';
    import { goto } from '$app/navigation';
    import { toast } from 'svelte-sonner';
    import { signIn } from '$lib/auth/auth.client';
    let { data }: { data: PageData } = $props();

    let email = $state('') ;
    let password = $state('');
    let isLoading = $state(false);
    let isFormValid = $derived(email && password && !isLoading);
    async function handleSubmit() {
        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        isLoading = true;
        try {
            await signIn.email(
                {email, 
                    password,
                     callbackURL: '/dashboard'}
                    ,{
                    onError:(ctx)=>{
                        toast.error(ctx.error.message);
                    }});
        } catch (error) {
            toast.error('Failed to sign in. Please try again.');
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
    <div class="w-full max-w-md space-y-8">
        <div class="text-center">
            <h1 class="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p class="mt-2 text-sm text-muted-foreground">
                Sign in to your account to continue
            </p>
        </div>

        <form onsubmit={handleSubmit} class="mt-8 space-y-6">
            <div class="space-y-4">
                <div>
                    <label for="email" class="block text-sm font-medium text-foreground">
                        Email address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        bind:value={email}
                        required
                        class="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-foreground">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        bind:value={password}
                        required
                        class="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Enter your password"
                    />
                </div>
            </div>

            <Button
                type="submit"
                class="w-full"
                disabled={ !isFormValid}
            >
                {#if isLoading}
                    Signing in...
                {:else}
                    Sign in
                {/if}
            </Button>
        </form>

        <div class="text-center text-sm">
            <p class="text-muted-foreground">
                Don't have an account?{' '}
                <a href="/signup" class="text-primary hover:underline">
                    Sign up
                </a>
            </p>
        </div>
    </div>
</div>