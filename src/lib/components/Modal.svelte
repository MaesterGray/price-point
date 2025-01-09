<script lang="ts">
	  import { enhance } from "$app/forms";
    import * as Dialog from "$lib/components/ui/dialog"
    import {toast} from 'svelte-sonner'
    let email = $state('')
    let isSubmitting = $state(false)
    let {productId} = $props()
</script>



<Dialog.Root >
  <Dialog.Trigger class='btn'>Track</Dialog.Trigger>
  <!-- <div class=" dialog-container"> -->
    <Dialog.Content class="dialog-content">
            <div class="flex flex-col">
              <div class="flex justify-between">
                <div class="p-3 border border-gray-200 rounded-10">
                  <img 
                    src="/assets/icons/logo.svg"
                    alt="logo"
                    width={28}
                    height={28}
                  />
                </div>

                
              </div>

              <h4 class="dialog-head_text">
                Stay updated with product pricing alerts right in your inbox!
              </h4>

              <p class="text-sm text-gray-600 mt-2">
                Never miss a bargain again with our timely alerts!
              </p>
            </div>
            <form 
            class="flex flex-col mt-5"
             action="?/addUserEmailToProduct" 
             method="post"
             use:enhance={
              ()=>{
                isSubmitting = true
                return async ({update,result})=>{
                  await update()
                  isSubmitting = false
                  if(result.data.error){
                    if(result.data.error === 'User already exists'){
                      toast.error('You are already tracking product')
                    }else{
                    toast.error('Server Error : check your network settings')
                    }
                  }else{
                    toast.success('You are now tracking this product')}
                }
              }
             }>
              <input type="hidden" name="productId" bind:value={productId} />
              <label for="email" class="text-sm font-medium text-gray-700">
                Email address
              </label>
              <div class="dialog-input_container">
                <img
                  src="/assets/icons/mail.svg"
                  alt='mail'
                  width={18}
                  height={18}
                />

                <input 
                  required
                  type="email"
                  name='userEmail'
                  id="email"
                  bind:value={email}
                  placeholder="Enter your email address"
                  class='dialog-input'
                />
              </div>

              <button type="submit"
                class="dialog-btn"
              >
                {isSubmitting ? 'Submitting...' : 'Track'}
              </button>
            </form>
      </Dialog.Content>
  <!-- </div> -->
  
</Dialog.Root>