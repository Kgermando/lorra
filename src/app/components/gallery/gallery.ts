import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface GalleryImage {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown)': 'onKeyDown($event)',
  },
})
export class GalleryComponent {
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly images: GalleryImage[] = [
    { src: '/galeries/WhatsApp%20Image%202026-05-23%20at%2014.25.05%20(1).jpeg', alt: 'Lorra Medical Centre – Installations (1)' },
    { src: '/galeries/WhatsApp%20Image%202026-05-23%20at%2014.25.05.jpeg',       alt: 'Lorra Medical Centre – Installations (2)' },
    { src: '/galeries/WhatsApp%20Image%202026-05-23%20at%2014.25.06.jpeg',       alt: 'Lorra Medical Centre – Installations (3)' },
    { src: '/galeries/WhatsApp%20Image%202026-05-23%20at%2014.25.07%20(1).jpeg', alt: 'Lorra Medical Centre – Installations (4)' },
    { src: '/galeries/WhatsApp%20Image%202026-05-23%20at%2014.25.07%20(2).jpeg', alt: 'Lorra Medical Centre – Installations (5)' },
    { src: '/galeries/WhatsApp%20Image%202026-05-23%20at%2014.25.07.jpeg',       alt: 'Lorra Medical Centre – Installations (6)' },
    { src: '/galeries/WhatsApp%20Image%202026-05-23%20at%2014.25.08%20(1).jpeg', alt: 'Lorra Medical Centre – Installations (7)' },
    { src: '/galeries/WhatsApp%20Image%202026-05-23%20at%2014.25.08%20(2).jpeg', alt: 'Lorra Medical Centre – Installations (8)' },
    { src: '/galeries/WhatsApp%20Image%202026-05-23%20at%2014.25.08%20(3).jpeg', alt: 'Lorra Medical Centre – Installations (9)' },
    { src: '/galeries/WhatsApp%20Image%202026-05-23%20at%2014.25.08.jpeg',       alt: 'Lorra Medical Centre – Installations (10)' },
    { src: '/galeries/WhatsApp%20Image%202026-05-23%20at%2014.25.09%20(1).jpeg', alt: 'Lorra Medical Centre – Installations (11)' },
    { src: '/galeries/WhatsApp%20Image%202026-05-23%20at%2014.25.09%20(2).jpeg', alt: 'Lorra Medical Centre – Installations (12)' },
    { src: '/galeries/WhatsApp%20Image%202026-05-23%20at%2014.25.09.jpeg',       alt: 'Lorra Medical Centre – Installations (13)' },
    { src: '/galeries/WhatsApp%20Image%202026-05-23%20at%2014.25.10%20(1).jpeg', alt: 'Lorra Medical Centre – Installations (14)' },
    { src: '/galeries/WhatsApp%20Image%202026-05-23%20at%2014.25.10.jpeg',       alt: 'Lorra Medical Centre – Installations (15)' },
  ];

  protected readonly activeIndex = signal<number | null>(null);

  protected readonly activeImage = computed(() => {
    const idx = this.activeIndex();
    return idx !== null ? this.images[idx] : null;
  });

  protected readonly activeCounter = computed(() => {
    const idx = this.activeIndex();
    return idx !== null ? `${idx + 1} / ${this.images.length}` : '';
  });

  openLightbox(index: number): void {
    this.activeIndex.set(index);
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeLightbox(): void {
    this.activeIndex.set(null);
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  prev(): void {
    this.activeIndex.update(i =>
      i !== null ? (i - 1 + this.images.length) % this.images.length : null
    );
  }

  next(): void {
    this.activeIndex.update(i =>
      i !== null ? (i + 1) % this.images.length : null
    );
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.activeIndex() === null) return;
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === 'ArrowLeft') this.prev();
    if (event.key === 'ArrowRight') this.next();
  }
}
