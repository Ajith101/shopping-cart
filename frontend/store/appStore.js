import { create } from "zustand";
import API from "./../utils/axios";
import { toast } from "react-toastify";

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const useAppStore = create((set, get) => ({
  user: user,
  loading: false,
  cart: null,
  totalCart: null,
  loginUser: async (details, navigate) => {
    try {
      set((state) => ({ loading: true }));
      const { data, status } = await API("/api/user/login", {
        method: "POST",
        data: { ...details },
      });
      if (status === 200) {
        toast.success("Login successfully");
        set((state) => ({ loading: false, user: data.user }));
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      }
    } catch (error) {
      set((state) => ({ loading: false }));
      toast, error(error?.response?.data?.message);
      console.log(error);
    }
  },
  registerUser: async (details, navigate) => {
    try {
      set(() => ({ loading: true }));
      const { data, status } = await API("/api/user/register", {
        method: "POST",
        data: { ...details },
      });

      if (status === 200) {
        set(() => ({ loading: false, user: data.user }));
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
        toast.success("Register successfully");
      }
    } catch (error) {
      set((state) => ({ loading: false }));
      toast, error(error?.response?.data?.message);
      console.log(error);
    }
  },

  addCart: async (product, navigate) => {
    try {
      set((state) => ({ loading: true }));
      const { data, status } = await API("/api/user/add-cart", {
        method: "POST",
        data: {
          product: { ...product },
        },
      });
      if (status === 200) {
        toast.success("Added to cart successfully");
        set((state) => ({
          loading: false,
          totalCart: data.total,
        }));
      }
    } catch (error) {
      set((state) => ({ loading: false }));
      if (error?.response?.status === 401) {
        navigate("/login");
      }
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  },

  addCartQty: async (id) => {
    try {
      set((state) => ({ loading: true }));
      const { data, status } = await API("/api/user/add-qty", {
        method: "POST",
        data: { productId: id },
      });
      if (status === 200) {
        toast.success("Added to cart successfully");
        let cart = get().cart;
        const updatedCart = cart.map((item) =>
          item.product.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        set((state) => ({
          loading: false,
          cart: updatedCart,
        }));
        // set((state) => ({ loading: false, cart: [...state.cart.] }));
      }
    } catch (error) {
      set((state) => ({ loading: false }));
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  },
  removeCartQty: async (id) => {
    try {
      set((state) => ({ loading: true }));
      const { data, status } = await API("/api/user/decrease-qty", {
        method: "POST",
        data: { productId: id },
      });
      if (status === 200) {
        toast.success("Added to cart successfully");
        let cart = get().cart;
        const updatedCart = cart.map((item) =>
          item.product.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        set((state) => ({
          loading: false,
          cart: updatedCart,
        }));
        // set((state) => ({ loading: false, cart: [...state.cart.] }));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
      set((state) => ({ loading: false }));
    }
  },

  getUserCart: async () => {
    try {
      set((state) => ({ loading: true }));
      const { data, status } = await API("/api/user/get-user-cart");
      if (status === 200) {
        set((state) => ({ cart: data.cartItems, loading: false }));
      }
    } catch (error) {
      set((state) => ({ loading: false }));
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  },
  // getUserCart: async () => {
  //   try {
  //     set((state) => ({ loading: true }));
  //     const { data, status } = await API("/api/user/get-user-cart");
  //     if (status === 200) {
  //       set((state) => ({ cart: data.cartItems, loading: false }));
  //     }
  //   } catch (error) {
  //     set((state) => ({ loading: false }));
  //     toast.error(error?.response?.data?.message);
  //     console.log(error);
  //   }
  // },

  removeCart: async (id) => {
    try {
      set((state) => ({ loading: true }));
      const { data, status } = await API("/api/user/remove-cart", {
        method: "DELETE",
        data: { id },
      });
      if (status === 200) {
        toast.success("Item removed successfully");
        let cart = get().cart;
        const updatedCart = cart.filter((item) => item.product.id !== id);
        set((state) => ({
          loading: false,
          cart: updatedCart,
          totalCart: data.total,
        }));
      }
    } catch (error) {
      set((state) => ({ loading: false }));
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  },

  logout: async (navigate, setShowMenu) => {
    try {
      set(() => ({ loading: true }));
      const { status } = await API("/api/user/logout", {
        method: "POST",
      });

      if (status === 200) {
        setShowMenu(false);
        set(() => ({ loading: false, user: null }));
        localStorage.clear();
        navigate("/");
        toast.success("Logged out successfully");
      }
    } catch (error) {
      set((state) => ({ loading: false }));
      toast, error(error?.response?.data?.message);
      console.log(error);
    }
  },
}));
