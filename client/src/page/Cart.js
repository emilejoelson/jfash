import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CartProduct from '../components/cartProduct';
import emptyCartImage from "../assest/empty.gif";
import { useTheme } from '@emotion/react';
import { Elements } from '@stripe/react-stripe-js';
import { tokens } from '../theme';
import { Typography } from '@mui/material';
import Footer from "../components/Footer";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const dealdujourCartItem = useSelector((state) => state.dealdujour.cartItemDeal);

  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  // Choose the cart items based on the source (product or deal du jour)
  const cartItems = [...productCartItem, ...dealdujourCartItem] || [];

  // Calculate the total price based on the chosen cart items
  const totalPrice = cartItems.reduce((acc, curr) => acc + parseInt(curr.total), 0);

  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    const initStripe = async () => {
      try {
        console.log('Initializing Stripe...');
        const stripeInstance = await loadStripe(process.env.REACT_APP_PUBLIC_KEY);
        console.log('Stripe Instance:', stripeInstance);
  
        if (!stripeInstance) {
          console.error('Stripe initialization failed: Stripe instance is null.');
          return;
        }
  
        setStripe(stripeInstance);
      } catch (error) {
        console.error('Error initializing Stripe:', error);
      }
    };
  
    initStripe();
  }, []);
  
  useEffect(() => {
    const newSocket = io(`${process.env.REACT_APP_SERVER_DOMIN}`, {
      transports: ['websocket'],
    });
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  const timeSince = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) {
      return seconds + " second" + (seconds !== 1 ? "s" : "") + " ago";
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return minutes + " minute" + (minutes !== 1 ? "s" : "") + " ago";
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return hours + " hour" + (hours !== 1 ? "s" : "") + " ago";
    } else {
      const days = Math.floor(seconds / 86400);
      return days + " day" + (days !== 1 ? "s" : "") + " ago";
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
  
    if (user.email && stripe) {
      try {
        const totalPrice = cartItems.reduce((acc, curr) => acc + parseInt(curr.total), 0);
  
        // Add these declarations
        const updatedData = {
          name: cartItems.map(item => item.name).join(", "),
          category: cartItems.map(item => item.category).join(", "),
          priceUnit: cartItems.map(item => parseInt(item.price)),
          quantity: cartItems.map(item => parseInt(item.qty)),
          totalUnit: cartItems.map(item => parseInt(item.total)),
          price: totalPrice.toString(),
          total: cartItems.reduce((acc, curr) => acc + parseInt(curr.qty), 0).toString(),
          username: user.lastName || "",
          userimage: user.image || "",
          telephone: user.telephone || "",
        };
  
        const [paymentRes, invoiceRes, totalRes] = await Promise.all([
          fetch(`${process.env.REACT_APP_SERVER_DOMIN}/checkoutpayement`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(cartItems),
          }),
          fetch(`${process.env.REACT_APP_SERVER_DOMIN}/createInvoice`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(updatedData),
          }),
          fetch(`${process.env.REACT_APP_SERVER_DOMIN}/updateTotal`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              qty: cartItems.map((item) => item.qty),
              price: cartItems.map((item) => item.price),
            }),
          }),
        ]);
  
        if (
          paymentRes.status === 500 ||
          invoiceRes.status === 500 ||
          totalRes.status === 500
        ) {
          throw new Error("Server error");
        }
  
        const paymentData = await paymentRes.json();
  
        const { error, result } = await stripe.redirectToCheckout({ sessionId: paymentData });
  
        if (error) {
          console.error('Stripe redirection failed:', error);
          toast.error('Stripe redirection failed');
        } else {
          toast('Redirecting to payment!');
          navigate('/facture', { state: { cartData: cartItems } });
  
          if (socket) {
            const notificationMessage = `${user.email} has just commended ${updatedData.name} with prix unit ${updatedData.priceUnit.join(', ')} having quantity ${updatedData.quantity.join(', ')}. The total is ${updatedData.totalUnit.join(', ')} and the price is ${totalPrice.toFixed(2)} dh, ${timeSince(new Date())} ago`;
  
            socket.emit('notification', {
              message: notificationMessage,
            });
          }
        }
      } catch (error) {
        console.error("Error handling payment:", error);
        toast.error("Payment processing failed");
      }
    } else {
      toast("You must log in!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };
  
  const handlePaymentByCash = async (e) => {
    e.preventDefault();

    if (user.email) {
        try {
            const totalPrice = cartItems.reduce((acc, curr) => acc + parseInt(curr.total), 0);

            // Add these declarations
            const updatedData = {
                name: cartItems.map(item => item.name).join(", "),
                category: cartItems.map(item => item.category).join(", "),
                priceUnit: cartItems.map(item => parseInt(item.price)),
                quantity: cartItems.map(item => parseInt(item.qty)),
                totalUnit: cartItems.map(item => parseInt(item.total)),
                price: totalPrice.toString(),
                total: cartItems.reduce((acc, curr) => acc + parseInt(curr.qty), 0).toString(),
                username: user.lastName || "",
                userimage: user.image || "",
                telephone: user.telephone || "",
            };

            const [invoiceRes, totalRes] = await Promise.all([
                fetch(`${process.env.REACT_APP_SERVER_DOMIN}/createInvoice`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedData),
                }),
                fetch(`${process.env.REACT_APP_SERVER_DOMIN}/updateTotal`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        qty: cartItems.map((item) => item.qty),
                        price: cartItems.map((item) => item.price),
                    }),
                }),
            ]);

            if (
                invoiceRes.status === 500 ||
                totalRes.status === 500
            ) {
                throw new Error("Server error");
            }

            toast('Paiement par chec avec succès !');
            navigate('/rendez-vous-par-paiement', { state: { cartData: cartItems } });

            if (socket) {
                const notificationMessage = `${user.email} has just ordered ${updatedData.name} with unit price ${updatedData.priceUnit.join(', ')} having quantity ${updatedData.quantity.join(', ')}. The total is ${updatedData.totalUnit.join(', ')} and the price is ${totalPrice.toFixed(2)} dh, ${timeSince(new Date())} ago`;

                socket.emit('notification', {
                    message: notificationMessage,
                });
            }
        } catch (error) {
            console.error("Error handling payment:", error);
            toast.error("Payment processing failed");
        }
    } else {
        toast("Il faut se connecter !");
        setTimeout(() => {
            navigate("/login");
        }, 1000);
    }
};

  

  const isMobile = window.innerWidth < 768;

  return (
    <div>
      <Elements stripe={stripe}>
      {isMobile ? (
        <div>
          <div className="bg-white mt-[9em] ">
            <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: "28px 0px 29px 0" }} paddingTop="20px">
              <span className="font-sans text-[#C49A45] "> Votre Article de Panier</span>
            </Typography>
            <div className="bg-[#cfa756d8] font-sans text-[#0A0A0A] p-2 flex gap-4  h-[24%] border border-slate-300">
                <div className="font-bold  flex-1">
                  Produit
                </div>
                <div className="font-bold flex-1">
                  PrixUnit
                </div>
                <div className="font-bold flex-1">
                  Quantité
                </div>
                <div className="font-bold flex-1 text-red-600">
                  Supprimer
                </div>
                <div className="font-bold flex-1">
                  Total
                </div>
            </div>
            {cartItems[0] ? (
              <div className="my-4">
                <div className=" flex ml-2 mr-3  ">
                  <div className='w-full h-full'>
                    {cartItems.map(el => (
                      <CartProduct
                        key={el._id}
                        id={el._id}
                        image={el.image}
                        qty={el.qty}
                        total={el.total}
                        price={el.price}
                      />
                    ))}
                    <div className="  mt-[5%]">
                      <div className=" ">
                        <Typography
                          variant="h2"
                          width='1'
                          height='40px'
                          fontWeight='bold'
                          sx={{ p: "15px 0px 45px 0" }}
                        > 
                        <span className="text-[#0A0A0A] font-sans ml-2"> TOTAL: {totalPrice.toFixed(2)}</span>
                        <span className="text-[#0A0A0A] font-sans"> dh</span>
                        </Typography>
                      </div>
                      <div className=" mt-5 mb-4">
                        <button
                          className="font-bold bg-green-500 text-slate-200 px-4 py-2 rounded"
                          sx={{
                            color: colors.grey[100],
                            fontSize: "16px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                          }}
                          onClick={handlePayment}
                        >
                          <span className="font-sans" >Paiement par carte</span>
                        </button>
                      </div>
                      <div className=" mt-5 mb-4">
                        <button
                          className="font-bold bg-green-500 text-slate-200 px-4 py-2 rounded"
                          sx={{
                            color: colors.grey[100],
                            fontSize: "16px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                          }}
                         
                        >
                          <span className="font-sans" >Paiement par espèce</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex w-full justify-center items-center pb-5 flex-col">
                <img src={emptyCartImage} alt="alt" className="w-full max-w-sm" />
                <p className="text-slate-500 text-3xl font-bold mt-4">Article Vide</p>
              </div>
            )}
          </div>
          <div className="mt-[-30px] "><Footer/></div>
        </div>
      ) : (
        <>
          <div className="p-2 md:p-4 bg-white">
            <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: "28px 0px 29px 0" }}>
            <span className="font-sans text-[#C49A45] "> Votre Article de Panier</span>
            </Typography>
            <div className="bg-[#cfa756d8] font-sans text-[#0A0A0A] p-2 flex gap-4 w-[45%] h-[24%] ml-[23%] rounded border border-slate-300">
                <div className="font-bold ml-2">
                  Produit
                </div>
                <div className="font-bold ml-2">
                  Designation
                </div>
                <div className="font-bold ml-[6%]">
                  PrixUnit
                </div>
                <div className="font-bold ml-[7%]">
                  Quantité
                </div>
                <div className="font-bold ml-[5%] text-red-600">
                  Supprimer
                </div>
                <div className="font-bold ml-[6%]">
                  Total
                </div>
            </div>
            {cartItems[0] ? (
              <div className="my-4">
                <div className="my-4 flex ml-[1%] mr-[10%]">
                  <div className='w-full h-full'>
                    {cartItems.map(el => (
                      <CartProduct
                        key={el._id}
                        name={el.name}
                        id={el._id}
                        image={el.image}
                        category={el.category}
                        qty={el.qty}
                        total={el.total}
                        price={el.price}
                        isDeal={false}
                      />
                    ))}
                    <div className="ml-[25%] w-[70%] mt-[5%]">
                      <div className="w-[40%] ">
                        <Typography
                          variant="h2"
                          width='1'
                          height='40px'
                          fontWeight='bold'
                          sx={{ p: "15px 0px 45px 0" }}
                        > 
                        <span className="text-[#0A0A0A] font-sans ml-2"> TOTAL: {totalPrice.toFixed(2)} dh</span>
                        </Typography>
                      </div>
                      <div className="flex gap-5">
                        <div className=" mt-5">
                          <button
                            className="font-bold bg-green-500 w-full text-slate-200 px-4 py-2 rounded"
                            sx={{
                              color: colors.grey[100],
                              fontSize: "16px",
                              fontWeight: "bold",
                              padding: "10px 20px",
                            }}
                            onClick={handlePayment}
                          >
                            <span className="font-sans" >Paiement par carte</span>
                          </button>
                        </div>
                        <div className=" mt-5">
                          <button
                            className="font-bold bg-slate-500 w-full text-slate-200 px-4 py-2 rounded"
                            sx={{
                              color: colors.grey[100],
                              fontSize: "16px",
                              fontWeight: "bold",
                              padding: "10px 20px",
                            }}
                            onClick={handlePaymentByCash}
                          >
                            <span className="font-sans" >Paiement par espèce</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex w-full justify-center items-center flex-col">
                <img src={emptyCartImage} alt="alt" className="w-full max-w-sm" />
                <p className="text-slate-500 text-3xl font-bold mt-4">Article Vide</p>
              </div>
            )}
          </div>
          <div>
            <Footer />
          </div>
        </>
      )}
      </Elements>
    </div>
  );
}

export default Cart;
