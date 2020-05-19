<?php
namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * Class PasswordEncoderSubscriber
 * @package App\Events
 */
class PasswordEncoderSubscriber implements EventSubscriberInterface{

    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    /**
     * PasswordEncoderSubscriber constructor.
     * @param UserPasswordEncoderInterface $encoder
     */
    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    /**
     * @inheritDoc
     */public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['encodePassword', EventPriorities::PRE_WRITE]
        ];
    }

    /**
     * @param ViewEvent $event
     */
    public function encodePassword(ViewEvent $event) {
        $result = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($result instanceof User && $method === "POST") {
            $user = $result;
            $hash = $this->encoder->encodePassword($user, $user->getPassword());
            $result->setPassword($hash);
        }
    }
}