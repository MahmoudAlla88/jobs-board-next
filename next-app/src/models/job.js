// job.model.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// نُعرِّف مخطط الـJob بالمواصفات نفسها
const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    // إذا أردت إضافة حقل للمنشئ (مثلاً userId أو companyId)، 
    // يمكنك إضافة:
    // author: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
  },
  {
    collection: 'jobs',    // يطابق اسم الـcollection في MongoDB 
    timestamps: true,      // ينشئ createdAt و updatedAt تلقائيًا
  }
);

// نصدر الموديل لنستخدمه في باقي أجزاء التطبيق
export const Job = model('Job', JobSchema);
