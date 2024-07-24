// chat.dto.ts
export class CreateChannelDto {
    ChannelName: string;
    Description?: string;
    Disease?: string;
    ChannelType: 'group' | 'dm'; // Enum can be defined separately
}

export class SendMessageDto {
    Content: string
    SenderID: string
    MediaUrl?: string
    ChannelID: string
}


