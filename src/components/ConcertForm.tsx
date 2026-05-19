"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DatabaseSetupAlert, isMissingConcertsTable } from "@/components/DatabaseSetupAlert";
import { FormField, FormSection } from "@/components/FormField";
import { createClient } from "@/lib/supabase/client";
import { formatCurrency, totalCost } from "@/lib/concert-metrics";
import { COST_CATEGORIES } from "@/lib/concert-metrics";

const emptyForm = {
  concert_name: "",
  artist: "",
  venue: "",
  city: "",
  state: "",
  concert_date: "",
  distance_from_home: "0",
  hours_at_event: "3",
  ticket_cost: "0",
  ticket_fees: "0",
  parking_cost: "0",
  food_drink_cost: "0",
  merchandise_cost: "0",
  lodging_cost: "0",
  travel_cost: "0",
  other_cost: "0",
  fun_rating: "7",
  notes: "",
};

type FormState = typeof emptyForm;

export function ConcertForm({ userId }: { userId: string }) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const previewTotal = useMemo(() => {
    return totalCost({
      ticket_cost: Number(form.ticket_cost) || 0,
      ticket_fees: Number(form.ticket_fees) || 0,
      parking_cost: Number(form.parking_cost) || 0,
      food_drink_cost: Number(form.food_drink_cost) || 0,
      merchandise_cost: Number(form.merchandise_cost) || 0,
      lodging_cost: Number(form.lodging_cost) || 0,
      travel_cost: Number(form.travel_cost) || 0,
      other_cost: Number(form.other_cost) || 0,
    });
  }, [form]);

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!form.concert_name.trim() || !form.artist.trim()) {
      setError("Please enter a concert name and artist.");
      return;
    }
    if (!form.concert_date) {
      setError("Please pick a concert date.");
      return;
    }
    const hours = Number(form.hours_at_event);
    if (!hours || hours <= 0) {
      setError("Hours at the event must be greater than zero.");
      return;
    }

    setSubmitting(true);
    const supabase = createClient();

    const { error: insertError } = await supabase.from("concerts").insert({
      user_id: userId,
      concert_name: form.concert_name.trim(),
      artist: form.artist.trim(),
      venue: form.venue.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      concert_date: form.concert_date,
      distance_from_home: Number(form.distance_from_home) || 0,
      hours_at_event: hours,
      ticket_cost: Number(form.ticket_cost) || 0,
      ticket_fees: Number(form.ticket_fees) || 0,
      parking_cost: Number(form.parking_cost) || 0,
      food_drink_cost: Number(form.food_drink_cost) || 0,
      merchandise_cost: Number(form.merchandise_cost) || 0,
      lodging_cost: Number(form.lodging_cost) || 0,
      travel_cost: Number(form.travel_cost) || 0,
      other_cost: Number(form.other_cost) || 0,
      fun_rating: Number(form.fun_rating),
      notes: form.notes.trim() || null,
    });

    setSubmitting(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setSuccess(true);
    setForm(emptyForm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {success && (
        <div role="alert" className="alert alert-success">
          <span>Concert saved! Ready to add another one.</span>
        </div>
      )}
      {error && isMissingConcertsTable(error) && <DatabaseSetupAlert />}
      {error && !isMissingConcertsTable(error) && (
        <div role="alert" className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      <FormSection
        title="Concert details"
        description="Tell us where you went and when."
      >
        <FormField
          label="Concert name"
          htmlFor="concert_name"
          required
          inputProps={{
            value: form.concert_name,
            onChange: (e) => update("concert_name", e.target.value),
            placeholder: "Summer Nights Tour",
          }}
        />
        <FormField
          label="Artist or band"
          htmlFor="artist"
          required
          inputProps={{
            value: form.artist,
            onChange: (e) => update("artist", e.target.value),
            placeholder: "The Midnight Echoes",
          }}
        />
        <FormField
          label="Venue"
          htmlFor="venue"
          required
          inputProps={{
            value: form.venue,
            onChange: (e) => update("venue", e.target.value),
          }}
        />
        <FormField
          label="City"
          htmlFor="city"
          required
          inputProps={{
            value: form.city,
            onChange: (e) => update("city", e.target.value),
          }}
        />
        <FormField
          label="State"
          htmlFor="state"
          required
          inputProps={{
            value: form.state,
            onChange: (e) => update("state", e.target.value),
            placeholder: "CA",
          }}
        />
        <FormField
          label="Concert date"
          htmlFor="concert_date"
          required
          inputProps={{
            type: "date",
            value: form.concert_date,
            onChange: (e) => update("concert_date", e.target.value),
          }}
        />
        <FormField
          label="Distance from home"
          htmlFor="distance_from_home"
          hint="Miles from your home"
          inputProps={{
            type: "number",
            min: 0,
            step: 0.1,
            value: form.distance_from_home,
            onChange: (e) => update("distance_from_home", e.target.value),
          }}
        />
        <FormField
          label="Hours at event"
          htmlFor="hours_at_event"
          hint="Approximate time at the venue"
          required
          inputProps={{
            type: "number",
            min: 0.5,
            step: 0.5,
            value: form.hours_at_event,
            onChange: (e) => update("hours_at_event", e.target.value),
          }}
        />
        <FormField
          label="Notes"
          htmlFor="notes"
          multiline
          inputProps={{
            rows: 3,
            value: form.notes,
            onChange: (e) => update("notes", e.target.value),
            placeholder: "Favorite song, who you went with, etc.",
          }}
        />
      </FormSection>

      <FormSection
        title="Costs"
        description="Enter amounts in dollars. Leave blank or zero if not applicable."
      >
        {COST_CATEGORIES.map(({ key, label }) => (
          <FormField
            key={key}
            label={label}
            htmlFor={key}
            inputProps={{
              type: "number",
              min: 0,
              step: 0.01,
              value: form[key as keyof FormState],
              onChange: (e) => update(key as keyof FormState, e.target.value),
            }}
          />
        ))}
        <div className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] sm:gap-4">
          <div className="hidden sm:block" />
          <div className="alert bg-primary/10 border-primary/20">
            <span className="font-semibold">
              Total concert cost: {formatCurrency(previewTotal)}
            </span>
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Fun rating"
        description="How much did you enjoy the show?"
      >
        <div className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] sm:gap-4 sm:items-center">
          <label htmlFor="fun_rating" className="label justify-start p-0 sm:justify-end">
            <span className="label-text font-medium">Rating (1–10)</span>
          </label>
          <div>
            <input
              id="fun_rating"
              type="range"
              min={1}
              max={10}
              step={1}
              value={form.fun_rating}
              onChange={(e) => update("fun_rating", e.target.value)}
              className="range range-primary w-full"
            />
            <div className="flex justify-between text-xs opacity-70 mt-1 px-1">
              <span>1 — Terrible Time</span>
              <span className="font-bold text-lg">{form.fun_rating}</span>
              <span>10 — Best Time Ever</span>
            </div>
          </div>
        </div>
      </FormSection>

      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <Link href="/concerts" className="btn btn-ghost">
          View my concerts
        </Link>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
        >
          {submitting ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "Save concert"
          )}
        </button>
      </div>
    </form>
  );
}
