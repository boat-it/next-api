// schema/orderHeader.ts
import { mysqlTable, int, varchar, datetime, date, time, tinyint, decimal, timestamp } from 'drizzle-orm/mysql-core';

export const orderHeader = mysqlTable('order_header', {
  orderId: int('order_id').notNull().autoincrement().primaryKey(),
  orderNumber: varchar('order_number', { length: 50 }).notNull(),

  orderDate: datetime('order_date').notNull(),
  deliveryDateFrom: date('delivery_date_from'),
  deliveryDateTo: date('delivery_date_to'),
  deliveryTimeFrom: time('delivery_time_from'),
  deliveryTimeTo: time('delivery_time_to'),

  description: varchar('description', { length: 255 }),

  transportType: varchar('transport_type', { length: 255 }),

  invoice: varchar('invoice', { length: 255 }),

  combieStatus: tinyint('combie_status').default(0),
  reversion: int('reversion'),
  cancelStatus: tinyint('cancel_status'),

  shippingCustomerId: varchar('shipping_customer_id', { length: 50 }),
  shippingCustomerName: varchar('shipping_customer_name', { length: 255 }),
  shippingAddress: varchar('shipping_address', { length: 255 }),
  tel: varchar('tel', { length: 255 }),

  isAddressSameFlag: tinyint('is_address_same_flag').notNull().default(1),

  customerId: varchar('customer_id', { length: 255 }),
  customerName: varchar('customer_name', { length: 255 }),
  billingAddress: varchar('billing_address', { length: 255 }),

  userId: int('user_id'),

  totalPrice: decimal('total_price', { precision: 10, scale: 4 }),
  totalRatio: decimal('total_ratio', { precision: 10, scale: 4 }),

  paymentTypeId: int('payment_type_id'),
  paymentTermsId: int('payment_terms_id'),
  installment: int('installment'),

  transactionsId: int('transactions_id'),
  transactionsStatus: int('transactions_status'),

  deliveryTime: int('delivery_time'),

  createdAt: timestamp('created_at').defaultNow(),
  createBy: varchar('create_by', { length: 255 }),

  updatedAt: timestamp('updated_at').onUpdateNow(),
  updatedBy: int('updated_by'),
});
