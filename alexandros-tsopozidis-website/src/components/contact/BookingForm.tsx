'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

interface FormData {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate?: string;
  message: string;
}

export default function BookingForm() {
  const t = useTranslations('contact');
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const subject = encodeURIComponent(`Booking Inquiry: ${data.eventType}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nEvent Type: ${data.eventType}\nEvent Date: ${data.eventDate || 'N/A'}\n\nMessage:\n${data.message}`
    );
    window.location.href = `mailto:booking@tsopozidis.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <p className="text-gold font-serif italic text-xl">{t('success_message')}</p>
      </div>
    );
  }

  const inputClasses = "w-full bg-bg-tertiary border border-border rounded-sm px-4 py-3 text-text-primary font-sans text-sm focus:border-gold focus:outline-none transition-colors duration-300 placeholder:text-text-tertiary";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-xs uppercase tracking-wider text-text-secondary mb-2 font-sans">{t('name')} *</label>
        <input
          {...register('name', { required: true })}
          className={inputClasses}
          placeholder={t('name')}
        />
        {errors.name && <p className="text-accent-red text-xs mt-1">Required</p>}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-text-secondary mb-2 font-sans">{t('email')} *</label>
        <input
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          type="email"
          className={inputClasses}
          placeholder={t('email')}
        />
        {errors.email && <p className="text-accent-red text-xs mt-1">Valid email required</p>}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-text-secondary mb-2 font-sans">{t('phone')}</label>
        <input
          {...register('phone')}
          type="tel"
          className={inputClasses}
          placeholder={t('phone')}
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-text-secondary mb-2 font-sans">{t('event_type')} *</label>
        <select
          {...register('eventType', { required: true })}
          className={inputClasses}
        >
          <option value="">{t('event_type')}</option>
          <option value="concert">{t('event_types.concert')}</option>
          <option value="festival">{t('event_types.festival')}</option>
          <option value="private">{t('event_types.private')}</option>
          <option value="corporate">{t('event_types.corporate')}</option>
          <option value="wedding">{t('event_types.wedding')}</option>
          <option value="other">{t('event_types.other')}</option>
        </select>
        {errors.eventType && <p className="text-accent-red text-xs mt-1">Required</p>}
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-text-secondary mb-2 font-sans">{t('event_date')}</label>
        <input
          {...register('eventDate')}
          type="date"
          className={inputClasses}
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-text-secondary mb-2 font-sans">{t('message')} *</label>
        <textarea
          {...register('message', { required: true })}
          rows={5}
          className={inputClasses}
          placeholder={t('message')}
        />
        {errors.message && <p className="text-accent-red text-xs mt-1">Required</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-gold text-bg-primary py-3 font-display uppercase tracking-wider text-sm hover:bg-gold-light transition-colors duration-300"
      >
        {t('send')}
      </button>
    </form>
  );
}
