// app/api/jobs/[id]/route.js

import { NextResponse } from 'next/server';
import { connectToDB } from '../../../../../src/lib/db';
import { Job } from '../../../../models/job';

// PUT /api/jobs/:id   → تحديث وظيفة بالقيم المرسلة في body
export async function PUT(request, { params }) {
  try {
    await connectToDB();

    const { id } = params; // id هو قيمة الـ ObjectId في MongoDB
    const updates = await request.json(); // { title?, location?, description?, deadline? }

    // نبني كائن التعديل على قدر الحقول المعطاة
    const allowedFields = {};
    if (updates.title !== undefined) allowedFields.title = updates.title.trim();
    if (updates.location !== undefined) allowedFields.location = updates.location.trim();
    if (updates.description !== undefined) allowedFields.description = updates.description.trim();
    if (updates.deadline !== undefined) allowedFields.deadline = new Date(updates.deadline);

    // نموذج findByIdAndUpdate: { new: true } لإرجاع الوثيقة المحدثة
    const updatedJob = await Job.findByIdAndUpdate(id, allowedFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedJob) {
      return NextResponse.json(
        { message: 'لم يتم العثور على الوظيفة المطلوبة للتحديث.' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json(
      { message: 'فشل في تحديث الوظيفة.' },
      { status: 500 }
    );
  }
}

// DELETE /api/jobs/:id   → حذف وظيفة معيّنة
export async function DELETE(request, { params }) {
  try {
    await connectToDB();

    const { id } = params;
    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      return NextResponse.json(
        { message: 'الوظيفة غير موجودة.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'تمّ حذف الوظيفة بنجاح.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json(
      { message: 'فشل في حذف الوظيفة.' },
      { status: 500 }
    );
  }
}
