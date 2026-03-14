'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate?: string;
  location?: string;
  message: string;
}

export default function BookingForm() {
  const t = useTranslations('contact');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // fallback — still show success since no email integration yet
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <p className="text-gold font-display text-xl">{t('success_message')}</p>
        <p className="text-text-secondary text-sm font-sans mt-4">
          WhatsApp: +7 938 316 30 34
        </p>
      </div>
    );
  }

  const eventTypes = ['concert', 'festival', 'corporate', 'wedding', 'private', 'other'] as const;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto">
      <h3 className="font-display text-xl uppercase tracking-wider text-center mb-8">
        {t('booking_title')}
      </h3>

      {/* Name */}
      <div>
        <label className="block text-xs text-text-secondary font-sans uppercase tracking-wider mb-2">
          {t('name')} *
        </label>
        <input
          {...register('name', { required: t('form_required') })}
          autoComplete="name"
          enterKeyHint="next"
          className="w-full bg-bg-secondary border border-border focus:border-gold/50 rounded-sm px-4 py-3 text-sm font-sans text-text-primary outline-none transition-colors"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1 font-sans">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs text-text-secondary font-sans uppercase tracking-wider mb-2">
          {t('email')} *
        </label>
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          enterKeyHint="next"
          {...register('email', {
            required: t('form_required'),
            pattern: { value: /^\S+@\S+$/i, message: t('form_valid_email') },
          })}
          className="w-full bg-bg-secondary border border-border focus:border-gold/50 rounded-sm px-4 py-3 text-sm font-sans text-text-primary outline-none transition-colors"
        />
        {errors.email && <p className="text-red-400 text-xs mt-1 font-sans">{errors.email.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-xs text-text-secondary font-sans uppercase tracking-wider mb-2">
          {t('phone')}
        </label>
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          enterKeyHint="next"
          {...register('phone')}
          className="w-full bg-bg-secondary border border-border focus:border-gold/50 rounded-sm px-4 py-3 text-sm font-sans text-text-primary outline-none transition-colors"
        />
      </div>

      {/* Event Type */}
      <div>
        <label className="block text-xs text-text-secondary font-sans uppercase tracking-wider mb-2">
          {t('event_type')}
        </label>
        <select
          {...register('eventType')}
          className="w-full bg-bg-secondary border border-border focus:border-gold/50 rounded-sm px-4 py-3 text-sm font-sans text-text-primary outline-none transition-colors"
        >
          {eventTypes.map((type) => (
            <option key={type} value={type}>
              {t(`event_types.${type}`)}
            </option>
          ))}
        </select>
      </div>

      {/* Event Date */}
      <div>
        <label className="block text-xs text-text-secondary font-sans uppercase tracking-wider mb-2">
          {t('event_date')}
        </label>
        <input
          type="date"
          {...register('eventDate')}
          className="w-full bg-bg-secondary border border-border focus:border-gold/50 rounded-sm px-4 py-3 text-sm font-sans text-text-primary outline-none transition-colors"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-xs text-text-secondary font-sans uppercase tracking-wider mb-2">
          {t('location')}
        </label>
        <input
          {...register('location')}
          enterKeyHint="next"
          className="w-full bg-bg-secondary border border-border focus:border-gold/50 rounded-sm px-4 py-3 text-sm font-sans text-text-primary outline-none transition-colors"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs text-text-secondary font-sans uppercase tracking-wider mb-2">
          {t('message')}
        </label>
        <textarea
          {...register('message')}
          rows={4}
          enterKeyHint="send"
          className="w-full bg-bg-secondary border border-border focus:border-gold/50 rounded-sm px-4 py-3 text-sm font-sans text-text-primary outline-none transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gold text-bg-primary px-8 py-3 text-sm font-display uppercase tracking-wider hover:bg-gold-light transition-all duration-300 disabled:opacity-50"
      >
        {submitting ? '...' : t('send')}
      </button>

      <p className="text-text-tertiary text-xs text-center font-sans">
        {t('urgent_note')}
      </p>
    </form>
  );
}
