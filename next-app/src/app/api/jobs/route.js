
import { NextResponse } from 'next/server';
import { connectToDB } from '../../../lib/db';
import { Job } from '../../../models/job';

export async function GET(request) {
  try {
    // 1. نتأكد أن الاتصال بـ MongoDB قائم
    await connectToDB();

    // 2. نجيب جميع الـ Jobs (مرتبين بالأحدث أولاً)
    const jobs = await Job.find({}).sort({ createdAt: -1 });
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { message: 'فشل في جلب قائمة الوظائف.' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // 1. نتأكد من وجود اتصال
    await connectToDB();

    // 2. نقرأ البيانات من جسم الطلب
    const { title, location, description, deadline } = await request.json();

    // 3. تحقق مبدئي من الحقول
    if (!title || !location || !description || !deadline) {
      return NextResponse.json(
        { message: 'جميع الحقول (title, location, description, deadline) مطلوبة.' },
        { status: 400 }
      );
    }

    // 4. ننشئ وثيقة جديدة في مجموعة jobs
    const newJob = await Job.create({
      title: title.trim(),
      location: location.trim(),
      description: description.trim(),
      deadline: new Date(deadline),
    });

    // 5. نعيدّ الوثيقة المنشأة مع حالة 201
    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { message: 'فشل في إنشاء الوظيفة.' },
      { status: 500 }
    );
  }
}
