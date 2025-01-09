<script>
    let {title,iconSrc,value} = $props()
</script>
<div class={`price-info_card`}>
    <p class="text-base text-black-100">{title}</p>

    <div class="flex gap-1">
      <img src={iconSrc} alt={title} width={24} height={24} />

      <p class="text-2xl font-bold ">{value}</p>
    </div>
  </div>