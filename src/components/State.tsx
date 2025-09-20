import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Zod Schema for form validation
const memberSchema = z.object({
  id: z.string().optional(),
  prefix: z.string().min(1, { message: 'กรุณาเลือกคำนำหน้า' }),
  firstName: z.string().min(1, { message: 'ชื่อต้องไม่ว่าง' }),
  lastName: z.string().min(1, { message: 'นามสกุลต้องไม่ว่าง' }),
  photoUrl: z.string().optional(),
  workHistory: z.string().optional(),
  pastAchievements: z.string().optional(),
  ministerialPosition: z.string().optional(),
  ministry: z.string().optional(),
  politicalParty: z.string().min(1, { message: 'กรุณาเลือกสังกัดพรรคการเมือง' }),
});

type MemberFormValues = z.infer<typeof memberSchema>;

// Mock data for initial display
const initialMembers: MemberFormValues[] = [
  {
    id: '1',
    prefix: 'นาย',
    firstName: 'สมชาย',
    lastName: 'ใจดี',
    politicalParty: 'พรรคก้าวไกล',
    photoUrl: 'https://i.pinimg.com/736x/d0/7d/fd/d07dfd02a7fac11e78349ba96dc557a5.jpg',
    workHistory: 'เคยเป็นผู้จัดการบริษัท',
  },
  {
    id: '2',
    prefix: 'นางสาว',
    firstName: 'สมหญิง',
    lastName: 'รักชาติ',
    politicalParty: 'พรรครวมไทยสร้างชาติ',
    photoUrl: 'https://i.pinimg.com/1200x/ba/2f/c8/ba2fc8ce75ff48427e9d6f3989b5fcf5.jpg',
    ministerialPosition: 'รัฐมนตรีว่าการ',
    ministry: 'กระทรวงการคลัง',
  },
];

// Options for dropdowns
const prefixOptions = ['นาย', 'นาง', 'นางสาว'];
const politicalPartyOptions = ['พรรคก้าวไกล', 'พรรครวมไทยสร้างชาติ', 'พรรคเพื่อไทย', 'พรรคพลังประชารัฐ', 'พรรคประชาธิปัตย์', 'อิสระ'];
const ministerialPositionOptions = ['รัฐมนตรีว่าการ', 'รัฐมนตรีช่วยว่าการ', 'รัฐมนตรี', '— ไม่มี —'];
const ministryOptions = ['กระทรวงการคลัง', 'กระทรวงการต่างประเทศ', 'กระทรวงการท่องเที่ยวและกีฬา', 'กระทรวงคมนาคม', 'กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม', '— ไม่มี —'];

const App: React.FC = () => {
  const [members, setMembers] = useState<MemberFormValues[]>(initialMembers);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      prefix: 'นาย',
      ministerialPosition: '— ไม่มี —',
      ministry: '— ไม่มี —',
      photoUrl: '',
    }
  });

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('photoUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: MemberFormValues) => {
    if (editingMemberId) {
      setMembers(members.map(member =>
        member.id === editingMemberId ? { ...data, id: editingMemberId } : member
      ));
      setEditingMemberId(null);
    } else {
      const newMember = { ...data, id: Date.now().toString() };
      setMembers([...members, newMember]);
    }
    reset();
  };

  const handleEdit = (memberId: string) => {
    const memberToEdit = members.find(member => member.id === memberId);
    if (memberToEdit) {
      reset(memberToEdit);
      setEditingMemberId(memberId);
    }
  };

  const handleDelete = (memberId: string) => {
    // Note: Use a custom modal instead of window.confirm() in a production app.
    if(window.confirm('คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้?')) {
      setMembers(members.filter(member => member.id !== memberId));
    }
  };
  
  const handleCancel = () => {
    reset();
    setEditingMemberId(null);
  };

  return (
    <div className="main-container">
      <div className="max-w-7xl mx-auto p-4">
        <h1>ทำเนียบสมาชิกสภาผู้แทนราษฎร</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Form Section */}
          <div className="p-8 bg-white rounded-3xl shadow-2xl transition-all duration-300 transform hover:scale-[1.01] hover:shadow-3xl">
            <h2>{editingMemberId ? 'แก้ไขข้อมูลสมาชิก' : 'เพิ่มสมาชิกใหม่'}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name fields */}
              <div className="form-grid three-columns">
                <div className="form-group">
                  <label>คำนำหน้า</label>
                  <select {...register('prefix')}>
                    {prefixOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.prefix && <p className="text-red-500 text-sm mt-1">{errors.prefix.message}</p>}
                </div>
                <div className="form-group">
                  <label>ชื่อ</label>
                  <input type="text" {...register('firstName')} />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                </div>
                <div className="form-group">
                  <label>นามสกุล</label>
                  <input type="text" {...register('lastName')} />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              {/* Photo & Party */}
              <div className="form-grid two-columns">
                <div className="form-group">
                  <label>รูปถ่าย (2”)</label>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} />
                </div>
                <div className="form-group">
                  <label>สังกัดพรรคการเมือง</label>
                  <select {...register('politicalParty')}>
                    <option value="">--เลือกพรรค--</option>
                    {politicalPartyOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.politicalParty && <p className="text-red-500 text-sm mt-1">{errors.politicalParty.message}</p>}
                </div>
              </div>

              {/* History and Achievements */}
              <div className="form-group">
                <label>ประวัติการทำงาน</label>
                <textarea {...register('workHistory')} rows={3}></textarea>
              </div>
              <div className="form-group">
                <label>ผลงานที่ผ่านมา</label>
                <textarea {...register('pastAchievements')} rows={3}></textarea>
              </div>

              {/* Ministerial fields */}
              <div className="form-grid two-columns">
                <div className="form-group">
                  <label>ตำแหน่งรัฐมนตรี</label>
                  <select {...register('ministerialPosition')}>
                    {ministerialPositionOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>กระทรวง</label>
                  <select {...register('ministry')}>
                    {ministryOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <button type="submit" className="button-submit">{editingMemberId ? 'บันทึกการแก้ไข' : 'เพิ่มสมาชิก'}</button>
              {editingMemberId && (
                <button type="button" onClick={handleCancel} className="button-cancel">ยกเลิก</button>
              )}
            </form>
          </div>

          {/* List Section */}
          <div className="p-8 bg-white rounded-3xl shadow-2xl">
            <h2>รายชื่อสมาชิกทั้งหมด</h2>
            {members.length === 0 ? (
              <p className="text-gray-500 text-center text-lg">ยังไม่มีข้อมูลสมาชิก</p>
            ) : (
              <ul className="space-y-6">
                {members.map((member) => (
                  <li key={member.id} className="member-card">
                    {member.photoUrl && (
                      <img src={member.photoUrl} alt={`${member.firstName} ${member.lastName}`} className="member-photo" />
                    )}
                    <div className="flex-grow">
                      <p className="font-bold text-xl text-gray-800">{member.prefix} {member.firstName} {member.lastName}</p>
                      <p className="text-md text-gray-600">พรรค: {member.politicalParty}</p>
                      {member.ministerialPosition && member.ministerialPosition !== '— ไม่มี —' && (
                        <p className="text-md text-gray-600 mt-1">ตำแหน่ง: {member.ministerialPosition} ({member.ministry})</p>
                      )}
                    </div>
                    <div className="flex space-x-2 mt-4 sm:mt-0">
                      <button onClick={() => handleEdit(member.id!)} className="button-edit">แก้ไข</button>
                      <button onClick={() => handleDelete(member.id!)} className="button-delete">ลบ</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
