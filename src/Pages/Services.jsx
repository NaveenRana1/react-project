import React, { useState } from "react";

const Services = () => {
  const [cart, setCart] = useState([]);

  // Services data
  const services = [
    { id: 1, name: "Dry Cleaning", price: 200, img: "/images/laundry.png" },
    { id: 2, name: "Ironing", price: 30, img: "/images/iron.png" },
    { id: 3, name: "Stain Removal", price: 100, img: "/images/stain-remover.png" },
    { id: 4, name: "Leather & Suede Cleaning", price: 500, img: "/images/leather.png" },
    { id: 5, name: "Wedding Dress Cleaning", price: 1000, img: "/images/wedding-dress.png" },
    { id: 6, name: "Wash & Fold", price: 100, img: "/images/wash.png" },
  ];

  // Add or update item in cart
  const addToCart = (service) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === service.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...service, quantity: 1 }];
    });
  };

  // Remove or decrease item quantity
  const removeFromCart = (serviceId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === serviceId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === serviceId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCart.filter((item) => item.id !== serviceId);
    });
  };

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="container mt-20 px-4 py-10 bg-amber-600">
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT SIDE – SERVICES */}
        <div className="bg-white p-6 rounded-lg shadow-2xl">
          <h1 className="text-3xl font-bold mb-2">Our Services</h1>
          <p className="text-gray-600 mb-4">
            Click + to add services to your cart, - to remove
          </p>
          <hr className="mb-6" />

          <div className="space-y-4">
            {services.map((service) => {
              const cartItem = cart.find((item) => item.id === service.id);
              return (
                <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 flex-1">
                    <img src={service.img} className="w-10 h-10" alt={service.name} />
                    <span className="font-medium">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">₹{service.price}</span>
                    <div className="flex items-center bg-white px-3 py-1 rounded-full border shadow-sm">
                      <button
                        onClick={() => removeFromCart(service.id)}
                        disabled={!cartItem}
                        className="w-8 h-8 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="mx-3 font-bold min-w-[20px] text-center">
                        {cartItem ? cartItem.quantity : 0}
                      </span>
                      <button
                        onClick={() => addToCart(service)}
                        className="w-8 h-8 rounded-full bg-green-500 text-white font-bold hover:bg-green-600 flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <hr className="my-6" />
          <p className="text-center text-sky-700">
            Adjust quantities and book now
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* Added Items Table */}
          <div className="bg-white p-6 rounded-lg shadow-2xl max-h-96 overflow-y-auto">
            <h1 className="text-2xl font-bold mb-4">Added Items</h1>
            <hr className="mb-4" />

            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No items added</p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3">Service</th>
                        <th className="text-center py-3">Qty</th>
                        <th className="text-right py-3">Price</th>
                        <th className="text-right py-3">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id} className="border-b last:border-b-0">
                          <td className="py-3 font-medium">{item.name}</td>
                          <td className="text-center py-3 font-bold">{item.quantity}</td>
                          <td className="text-right py-3">₹{item.price}</td>
                          <td className="text-right py-3 font-bold">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <hr className="my-4" />
                <div className="flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </>
            )}
          </div>

          {/* Booking Form */}
          <div className="bg-white p-6 rounded-lg shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Book Now</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email ID"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </form>
            <button 
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold disabled:bg-gray-400 cursor-pointer"
              disabled={cart.length === 0}
            >
              Book Now (₹{total.toLocaleString()})
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
