"use client";

/**
 * ComposableForm — Lightweight schema-driven form for Next.js
 *
 *
 * Usage:
 * -------
 * <ComposableForm
 *   action="https://formspree.io/f/yourformid"
 *   fields={[
 *     { name: "name",    type: "text",     label: "Full Name",  placeholder: "Jane Smith", required: true },
 *     { name: "email",   type: "email",    label: "Email",      placeholder: "jane@example.com", required: true },
 *     { name: "role",    type: "select",   label: "Role",       options: ["Admin", "Editor", "Viewer"] },
 *     { name: "message", type: "textarea", label: "Message",    placeholder: "Say something..." },
 *     { name: "terms",   type: "checkbox", label: "I agree to the terms" },
 *     { name: "updates", type: "switch",   label: "Send me updates" },
 *   ]}
 *   submitLabel="Send Message"
 * />
 */

import * as React from "react";
import { Check, Loader2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Stack } from "@/components/ui/stack";

// ---------------------------------------------------------------------------
// Field types
// ---------------------------------------------------------------------------

type BaseField = {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
};

export type InputField = BaseField & {
  type: "text" | "email" | "password" | "number" | "url" | "tel" | "date";
  placeholder?: string;
  defaultValue?: string;
};

export type TextareaField = BaseField & {
  type: "textarea";
  placeholder?: string;
  rows?: number;
  defaultValue?: string;
};

export type SelectField = BaseField & {
  type: "select";
  /** Pass plain strings or { label, value } objects */
  options: string[] | { label: string; value: string }[];
  placeholder?: string;
  defaultValue?: string;
};

export type CheckboxField = BaseField & {
  type: "checkbox";
  defaultChecked?: boolean;
};

export type SwitchField = BaseField & {
  type: "switch";
  defaultChecked?: boolean;
};

export type CustomField = BaseField & {
  type: "custom";
  render: (helpers: {
    name: string;
    required?: boolean;
    disabled?: boolean;
  }) => React.ReactNode;
};

export type FieldDef =
  | InputField
  | TextareaField
  | SelectField
  | CheckboxField
  | SwitchField
  | CustomField;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ComposableFormProps {
  fields: FieldDef[];
  serverAction?: (formData: FormData) => Promise<void>;
  /**
   * POST destination — e.g. a Formspree URL or a Next.js API/server-action route.
   * If you pass `onSubmit` instead, `action` is ignored.
   */
  action?: string;
  /**
   * Override the default fetch submit.
   * Receives raw FormData — do whatever you like with it.
   */
  onSubmit?: (data: FormData) => Promise<void> | void;
  /** Runs after a successful submission. */
  onSuccess?: () => void;
  /** Runs when submission throws. */
  onError?: (err: unknown) => void;
  submitLabel?: string;
  /** Slot rendered to the left of the submit button (e.g. a Cancel button). */
  actions?: React.ReactNode;
  columns?: 1 | 2 | 3;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ComposableForm({
  fields,
  action,
  serverAction,
  onSubmit,
  onSuccess,
  onError,
  submitLabel = "Send forespørsel",
  actions,
  columns = 1,
  className,
}: ComposableFormProps) {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const isServerAction = typeof serverAction === "function";

  console.log("isServerAction", isServerAction);

  // Select values must be tracked in state because shadcn's Select is controlled
  const [selectValues, setSelectValues] = React.useState<
    Record<string, string>
  >(() =>
    Object.fromEntries(
      fields
        .filter((f) => f.type === "select")
        .map((f) => [f.name, (f as SelectField).defaultValue ?? ""]),
    ),
  );

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    if (isServerAction) return;

    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Select values are injected via hidden inputs but we sync them here too
    for (const [k, v] of Object.entries(selectValues)) data.set(k, v);

    setLoading(true);
    setSuccess(false);
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else if (action) {
        const res = await fetch(action, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      }
      setSuccess(true);
      onSuccess?.();
      form.reset();
      setSelectValues((prev) =>
        Object.fromEntries(Object.keys(prev).map((k) => [k, ""])),
      );
    } catch (err) {
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }

  const colClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  }[columns];

  return (
    <form
      action={serverAction ?? undefined}
      onSubmit={handleSubmit}
      className={["grid gap-4", colClass, className].filter(Boolean).join(" ")}
    >
      {fields.map((field) => {
        // These types always take the full width regardless of column count
        const fullWidth =
          field.type === "textarea" ||
          field.type === "checkbox" ||
          field.type === "switch" ||
          field.type === "custom";

        return (
          <div
            key={field.name}
            className={fullWidth && columns > 1 ? "col-span-full" : ""}
          >
            <FieldRenderer
              field={field}
              selectValue={selectValues[field.name] ?? ""}
              onSelectChange={(val) =>
                setSelectValues((prev) => ({ ...prev, [field.name]: val }))
              }
            />
          </div>
        );
      })}

      {success && (
        <p className="col-span-full text-sm text-green-600 dark:text-green-400">
          <Check className="w-4 h-4" /> Mottatt! Vi tar kontakt så snart vi kan.
        </p>
      )}

      <div
        className={[
          "flex items-center gap-3",
          columns > 1 ? "col-span-full" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {actions}
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitLabel}
          {loading && <Send className="h-4 w-4 shrink-0" />}
        </Button>
      </div>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Field renderer
// ---------------------------------------------------------------------------

function FieldRenderer({
  field,
  selectValue,
  onSelectChange,
}: {
  field: FieldDef;
  selectValue: string;
  onSelectChange: (val: string) => void;
}) {
  const id = `field-${field.name}`;

  switch (field.type) {
    case "text":
    case "email":
    case "password":
    case "number":
    case "url":
    case "tel":
    case "date":
      return (
        <Wrapper id={id} field={field}>
          <Input
            id={id}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            defaultValue={field.defaultValue}
            required={field.required}
            disabled={field.disabled}
          />
        </Wrapper>
      );

    case "textarea":
      return (
        <Wrapper id={id} field={field}>
          <Textarea
            id={id}
            name={field.name}
            placeholder={field.placeholder}
            defaultValue={field.defaultValue}
            rows={field.rows ?? 4}
            required={field.required}
            disabled={field.disabled}
          />
        </Wrapper>
      );

    case "select": {
      const options = field.options.map((o) =>
        typeof o === "string" ? { label: o, value: o } : o,
      );
      return (
        <Wrapper id={id} field={field}>
          {/* Hidden input so FormData always has the value */}
          <input type="hidden" name={field.name} value={selectValue} />
          <Select
            value={selectValue}
            onValueChange={onSelectChange}
            disabled={field.disabled}
          >
            <SelectTrigger className="w-full" id={id}>
              <SelectValue placeholder={field.placeholder ?? "Select…"} />
            </SelectTrigger>
            <SelectContent>
              {options.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Wrapper>
      );
    }

    case "checkbox":
      return (
        <Stack space={1}>
          <div className="flex items-center gap-2">
            <Checkbox
              id={id}
              name={field.name}
              defaultChecked={field.defaultChecked}
              required={field.required}
              disabled={field.disabled}
            />
            {field.label && (
              <Label htmlFor={id} className="cursor-pointer font-normal">
                {field.label}
                {field.required && (
                  <span className="ml-0.5 text-destructive">*</span>
                )}
              </Label>
            )}
          </div>
          {field.description && (
            <p className="text-xs text-muted-foreground">{field.description}</p>
          )}
        </Stack>
      );

    case "switch":
      return (
        <Stack space={1}>
          <div className="flex items-center gap-2">
            <Switch
              id={id}
              name={field.name}
              defaultChecked={field.defaultChecked}
              disabled={field.disabled}
            />
            {field.label && (
              <Label htmlFor={id} className="cursor-pointer font-normal">
                {field.label}
              </Label>
            )}
          </div>
          {field.description && (
            <p className="text-xs text-muted-foreground">{field.description}</p>
          )}
        </Stack>
      );

    case "custom":
      return (
        <Stack space={2}>
          {field.label && (
            <Label>
              {field.label}
              {field.required && (
                <span className="ml-0.5 text-destructive">*</span>
              )}
            </Label>
          )}
          {field.render({
            name: field.name,
            required: field.required,
            disabled: field.disabled,
          })}
          {field.description && (
            <p className="text-xs text-muted-foreground">{field.description}</p>
          )}
        </Stack>
      );

    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Shared label + description wrapper for standard inputs
// ---------------------------------------------------------------------------

function Wrapper({
  id,
  field,
  children,
}: {
  id: string;
  field: BaseField;
  children: React.ReactNode;
}) {
  return (
    <Stack space={2}>
      {field.label && (
        <Label htmlFor={id}>
          {field.label}
          {field.required && <span className="ml-0.5 text-destructive">*</span>}
        </Label>
      )}
      {children}
      {field.description && (
        <p className="text-xs text-muted-foreground">{field.description}</p>
      )}
    </Stack>
  );
}
