import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from '../_services/user.service';
import { VideoSDKMeeting } from '@videosdk.live/rtc-js-prebuilt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
    this.videoInit() 
  }

  async videoInit() {
    const apiKey = environment.VIDEOSDK_API_KEY;
    const meetingId = '7Span';
    const name = 'Anil Vora';

    const config = {
      name: name,
      meetingId: meetingId,
      apiKey: apiKey,

      containerId: null,
      redirectOnLeave: 'https://www.videosdk.live/',

      micEnabled: true,
      webcamEnabled: true,
      participantCanToggleSelfWebcam: true,
      participantCanToggleSelfMic: true,

      chatEnabled: true,
      screenShareEnabled: true,
      pollEnabled: true,
      whiteboardEnabled: true,
      raiseHandEnabled: true,

      recordingEnabled: true,
      recordingEnabledByDefault: false,
      recordingWebhookUrl: 'https://www.videosdk.live/callback',
      recordingAWSDirPath: `/meeting-recordings/${meetingId}/`, // automatically save recording in this s3 path

      brandingEnabled: true,
      brandLogoURL: 'https://picsum.photos/200',
      brandName: 'Awesome startup',

      participantCanLeave: true, // if false, leave button won't be visible

      livestream: {
        autoStart: true,
        outputs: [
          // {
          //   url: "rtmp://x.rtmp.youtube.com/live2",
          //   streamKey: "<STREAM KEY FROM YOUTUBE>",
          // },
        ],
      },

      permissions: {
        askToJoin: false, // Ask joined participants for entry in meeting
        toggleParticipantMic: true, // Can toggle other participant's mic
        toggleParticipantWebcam: true, // Can toggle other participant's webcam
        removeParticipant: true, // Remove other participant from meeting
        endMeeting: true, // End meeting for all participant
        drawOnWhiteboard: true, // Can Draw on whiteboard
        toggleWhiteboard: true, // Can toggle whiteboard
        toggleRecording: true, // Can toggle recording
      },

      pin: {
        allowed: true, // participant can pin any participant in meeting
        layout: 'SPOTLIGHT', // meeting layout - GRID | SPOTLIGHT | SIDEBAR
      },

      leftScreen: {
        // visible when redirect on leave not provieded
        actionButton: {
          // optional action button
          label: 'Video SDK Live', // action button label
          href: 'https://videosdk.live/', // action button href
        },
      },
    };

    const meeting = new VideoSDKMeeting();
    meeting.init(config);
  }
}
