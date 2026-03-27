async function ambilDataProduct() {
    const res = await fetch('https://api.example.com/products')
    return res.json();
}

export default async function HalamanProduct() {
    const product = await ambilDataProduct();
    return (
        <div>
            <h1>Halaman Product</h1>
            <p>{product.name}</p>
            <ul>
                {product.map((item: any) => (
                    <li key={item.id}>{item.name} - Rp {item.harga}</li>
                ))}
            </ul>
        </div>
    )
}