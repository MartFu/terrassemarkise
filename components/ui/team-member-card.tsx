import { Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import type { TeamMember } from "@/innhold/types";
import { Heading, Text } from "./typography";
import { Card } from "./card";
import { Button } from "./button";
import { SocialIcon } from "./social-icon";

interface TeamMemberCardProps {
  member: TeamMember;
  variant?: "default" | "compact";
}

export function TeamMemberCard({
  member,
  variant = "default",
}: TeamMemberCardProps) {
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 rounded-full overflow-hidden shrink-0">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <Heading level="h6" as="h4">
            {member.name}
          </Heading>
          <Text size="sm" color="muted">
            {member.role}
          </Text>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <div className="flex flex-col items-center text-center">
        <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
          />
        </div>
        <Heading level="h5" as="h3">
          {member.name}
        </Heading>
        <Text color="muted" className="mb-2">
          {member.role}
        </Text>
        <Text size="sm" className="mb-4">
          {member.bio}
        </Text>

        {member.funFact && (
          <Text size="xs" color="muted" className="italic mb-4">
            {`"${member.funFact}"`}
          </Text>
        )}

        <div className="flex gap-2 mt-auto">
          {member.linkedin && (
            <Button variant="ghost" size="icon-sm" asChild>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon name="LinkedIn" className="h-4 w-4" />
                <span className="sr-only">
                  LinkedIn profil for {member.name}
                </span>
              </a>
            </Button>
          )}
          {member.email && (
            <Button variant="ghost" size="icon-sm" asChild>
              <a href={`mailto:${member.email}`}>
                <Mail className="h-4 w-4" />
                <span className="sr-only">Send e-post til {member.name}</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
