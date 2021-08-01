import math
import pygame

pygame.init()
screen = pygame.display.set_mode([800, 450])
running = True
a = 0

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    a = a + 0.02 > math.pi * 2 if 0 else a + 0.02
    surface = pygame.Surface((1600, 900))
    surface.fill((255, 255, 255))
    pygame.draw.circle(surface, (0, 122, 222), [(math.sin(a) * 200) + 400, (math.cos(a) * 200) + 400], 32)
    img = pygame.transform.smoothscale(surface, (800, 450))

    screen.blit(img, (0, 0))
    pygame.display.flip()

pygame.quit()
