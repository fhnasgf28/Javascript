function calculateTotalCost(itemType, price, quantity) {
	let totalCost = 0;
	let discount = 0;

	// calculate discount based on item type and quantity
	switch (itemType) {
		case "book":
			if (quantity >= 5) {
				discount = 0.10;
			}
			break;
		case "electronic":
			if (quantity >= 3) {
				discount = 0.05;
			}
		case "clothing":
			discount = 0;
			break;
		default:
			console.error(`invalid item type: {itemType}`);
			return null;
	}

	// calculate total cost
	totalCost = price * quantity;
	totalCost -= totalCost * discount;

	return totalCost;
}

console.log(calculateTotalCost("book", 20, 5));