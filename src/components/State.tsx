import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const mpSchema = z.object({
  title: z.enum(['นาย', 'นาง', 'นางสาว']),
  firstName: z.string().min(1, 'กรุณากรอกชื่อ'),
  lastName: z.string().min(1, 'กรุณากรอกนามสกุล'),
  photo: z.string().url('กรุณาใส่ URL รูปภาพที่ถูกต้อง'),
  workHistory: z.string().min(1, 'กรุณากรอกประวัติการทำงาน'),
  achievements: z.string().min(1, 'กรุณากรอกผลงานที่ผ่านมา'),
  ministerialPosition: z.string().optional(),
  ministry: z.string().optional(),
  politicalParty: z.string().min(1, 'กรุณาเลือกพรรคการเมือง'),
});

export type Mp = z.infer<typeof mpSchema>;
const State = () => {
  const [mps, setMps] = useState<Mp[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Mp>({
    resolver: zodResolver(mpSchema),
  });

  const onSubmit = (data: Mp) => {
    if (editingIndex !== null) {
      const updatedMps = [...mps];
      updatedMps[editingIndex] = data;
      setMps(updatedMps);
      setEditingIndex(null);
    } else {
      setMps([...mps, data]);
    }
    reset();
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    reset(mps[index]);
  };

  const handleDelete = (index: number) => {
    const updatedMps = mps.filter((_, i) => i !== index);
    setMps(updatedMps);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">ทำเนียบรายชื่อสมาชิกสภาผู้แทนราษฎร</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">คำนำหน้า</label>
            <select {...register('title')} className="shadow border rounded w-full py-2 px-3 text-gray-700">
              <option value="">เลือก</option>
              <option value="นาย">นาย</option>
              <option value="นาง">นาง</option>
              <option value="นางสาว">นางสาว</option>
            </select>
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">ชื่อ</label>
            <input {...register('firstName')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
          </div>

          {/* Add all other form fields similarly */}
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {editingIndex !== null ? 'บันทึกการแก้ไข' : 'เพิ่มสมาชิก'}
          </button>
        </div>
      </form>

      {/* MP List Display */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">รายชื่อสมาชิก</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mps.map((mp, index) => (
            <div key={index} className="bg-white shadow-md rounded p-4">
              <img src={mp.photo} alt={`${mp.title} ${mp.firstName}`} className="w-24 h-24 rounded-full mx-auto" />
              <h3 className="text-lg font-bold text-center mt-2">{mp.title} {mp.firstName} {mp.lastName}</h3>
              <p className="text-sm text-gray-600 text-center">พรรค: {mp.politicalParty}</p>
              <div className="mt-4 flex justify-around">
                <button onClick={() => handleEdit(index)} className="bg-yellow-500 hover:bg-yellow-700 text-white text-sm py-1 px-2 rounded">
                  แก้ไข
                </button>
                <button onClick={() => handleDelete(index)} className="bg-red-500 hover:bg-red-700 text-white text-sm py-1 px-2 rounded">
                  ลบ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default State;