import React from 'react';

const ProductPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg max-w-5xl w-full flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src="DefinitiveStamp.png" // Replace with your actual image path
            alt="Product"
            className="object-cover w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>

        {/* Details Section */}
        <div className="p-10 md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">I.C.S. GWALIOR 1885</h2>
            <h3 className="text-xl font-semibold mb-4">SG35a Mint QV 2r carmine and yellow-brown variety Small G</h3>
            <p className="text-gray-600 mb-6">
              1885-97 2r carmine and yellow-brown, variety small 'G', brilliant o.g. From R3/1 of a left pane, May 1901 printing.
              Only 101 possible, but most were used and lost. Rare in this exceptional condition. Ex Domingo (SGA 28 Jan 2020, lot 150).
            </p>
            <p className="text-2xl font-bold mb-6">£700.00</p>
            <p className="text-sm text-gray-500 mb-6">Shipping to the UK: Free</p>
          </div>

          {/* Buttons */}
          <div>
            <div className="flex space-x-4 mb-6">
              <button className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800">
                Add to Cart
              </button>
              <button className="border border-gray-300 px-6 py-3 rounded hover:bg-gray-100">
                Enquiries/Payments
              </button>
            </div>

            {/* Wishlist and Delivery Information */}
            <div className="flex space-x-4 items-center text-gray-500 text-sm">
              <button className="hover:text-gray-700">Add to Wishlist</button>
              <span>|</span>
              <button className="hover:text-gray-700">Delivery</button>
              <span>|</span>
              <button className="hover:text-gray-700">Returns</button>
              <span>|</span>
              <button className="hover:text-gray-700">Payment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
