import { useState } from 'react';
import { orderService } from '../services/api';

const styles = {
  sectionTitle: { fontSize: 20, fontWeight: 700, marginBottom: 12 },
  field: { marginBottom: 12 },
  label: { display: 'block', marginBottom: 4, fontWeight: 500 },
  input: {
    border: '1px solid #d1d5db',
    borderRadius: 4,
    padding: '8px 10px',
    width: '100%',
    outline: 'none'
  },
  select: {
    border: '1px solid #d1d5db',
    borderRadius: 4,
    padding: '8px 10px',
    width: '100%',
    outline: 'none',
    background: '#fff'
  },
  error: {
    background: '#fee2e2',
    color: '#b91c1c',
    padding: 8,
    borderRadius: 6,
    marginBottom: 12
  },
  button: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    padding: '10px 16px',
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600
  },
  buttonHover: {
    backgroundColor: '#2563eb'
  },
  subTitle: { fontWeight: 700, marginTop: 8, marginBottom: 8 }
};

export function OrderForm({ onOrderCreated }) {
  const [formData, setFormData] = useState({
    reseller_email: '',
    cart_id: '',
    payment_method: 'credit_card',
    shipping_address: {
      street: '',
      number: '',
      city: '',
      state: '',
      zip_code: ''
    }
  });
  const [error, setError] = useState('');
  const [hover, setHover] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const order = await orderService.createOrder(formData);
      onOrderCreated(order);
      setFormData({
        reseller_email: '',
        cart_id: '',
        payment_method: 'credit_card',
        shipping_address: {
          street: '',
          number: '',
          city: '',
          state: '',
          zip_code: ''
        }
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('shipping_address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        shipping_address: {
          ...prev.shipping_address,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={styles.sectionTitle}>Novo Pedido</h3>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.field}>
        <label style={styles.label}>Email do Revendedor</label>
        <input
          type="email"
          name="reseller_email"
          value={formData.reseller_email}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>ID do Carrinho</label>
        <input
          type="text"
          name="cart_id"
          value={formData.cart_id}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Método de Pagamento</label>
        <select
          name="payment_method"
          value={formData.payment_method}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="credit_card">Cartão de Crédito</option>
          <option value="pix">PIX</option>
          <option value="bank_slip">Boleto</option>
        </select>
      </div>

      <div style={{ ...styles.field, marginTop: 12 }}>
        <h4 style={styles.subTitle}>Endereço de Entrega</h4>

        <div style={styles.field}>
          <label style={styles.label}>Rua</label>
          <input
            type="text"
            name="shipping_address.street"
            value={formData.shipping_address.street}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Número</label>
          <input
            type="text"
            name="shipping_address.number"
            value={formData.shipping_address.number}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Cidade</label>
          <input
            type="text"
            name="shipping_address.city"
            value={formData.shipping_address.city}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Estado</label>
          <input
            type="text"
            name="shipping_address.state"
            value={formData.shipping_address.state}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>CEP</label>
          <input
            type="text"
            name="shipping_address.zip_code"
            value={formData.shipping_address.zip_code}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        style={{ ...styles.button, ...(hover ? styles.buttonHover : null) }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Criar Pedido
      </button>
    </form>
  );
}