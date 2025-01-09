<script>
    let {product} = $props()
</script>
<a href={`/products/${product._id}`} class="product-card">
    <div class="product-card_img-container">
      <img
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
        class="product-card_img"
      />
    </div>

    <div class="flex flex-col gap-3">
      <h3 class="product-title">{product.title}</h3>

      <div class="flex justify-between">
        <p class="text-black opacity-50 text-lg capitalize">
          {product.category}
        </p>

        <p class="text-black text-lg font-semibold">
          <span>{product?.currency}</span>
          <span>{product?.currentPrice}</span>
        </p>
      </div>
    </div>
  </a>