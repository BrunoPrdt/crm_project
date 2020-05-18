<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\CustomerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
/**
 * @ORM\Entity(repositoryClass=CustomerRepository::class)
 * @ApiResource(
 *     collectionOperations={"get", "post"},
 *     itemOperations={"get", "delete", "PUT", "patch"},
 *     subresourceOperations={
            "invoices_get_subresource"={"path"="/customers/{id}/invoices"}
 *     },
 *     normalizationContext={
            "groups"={"customers_read"}
 *     }
 * )
 * @ApiFilter(SearchFilter::class, properties={"firstName": "partial", "lastName": "partial", "company": "partial"})
 * @ApiFilter(OrderFilter::class)
 */
class Customer
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"customers_read", "invoices_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customers_read", "invoices_read"})
     * @Assert\NotBlank(message="Le prénom du customer est obligatoire")
     * @Assert\Length(min="3", max="255", minMessage="Le prénom doit faire en 3 et 255 caractères", maxMessage="Le prénom doit faire en 3 et 255 caractères")
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customers_read", "invoices_read"})
     * @Assert\NotBlank(message="Le nom du customer est obligatoire")
     * @Assert\Length(min="3", max="255", minMessage="Le nom doit faire en 3 et 255 caractères", maxMessage="Le nom doit faire en 3 et 255 caractères")
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customers_read", "invoices_read"})
     * @Assert\NotBlank(message="L'adresse email du customer est obligatoire")
     * @Assert\Email(message="Le format de l'adresse email doit être valide")
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"customers_read", "invoices_read"})
     */
    private $compagny;

    /**
     * @ORM\OneToMany(targetEntity=Invoice::class, mappedBy="customer")
     * @Groups({"customers_read"})
     * @ApiSubresource()
     */
    private $invoices;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="customers")
     * @Groups({"customers_read"})
     * @Assert\NotBlank(message="L'utilisaateur est obligatoire")
     */
    private $user;

    public function __construct()
    {
        $this->invoices = new ArrayCollection();
    }

    /**
     * Permet de récupérer le total des invoyces
     * @return float
     * @Groups({"customers_read"})
     */
    public function getTotalAmount(): float
    {
        return array_reduce($this->invoices->toArray(), function ($total, $invoice){
            return $total + $invoice->getAmount();
        }, 0);
    }

    /**
     * Permet de récupérer le montant total des factures non payées
     * @return float
     * @Groups({"customers_read"})
     */
    public function getUnpaidAmount(): float
    {
        return array_reduce($this->invoices->toArray(), function ($total, $invoice){
            return $total + ($invoice->getStatus() === "SENT" ? $invoice->getAmount() : 0);
        }, 0);
    }

    /**
     * Permet de récupérer le total des factures annulées pour ce client
     * @return float
     * @Groups({"customers_read"})
     */
    public function getCancelledAmount(): float
    {
        return array_reduce($this->invoices->toArray(), function ($total, $invoice){
            return $total + ($invoice->getStatus() === "CANCELLED" ? $invoice->getAmount() : 0);
        }, 0);
    }

    /**
     * Permet de récupérer le total des factures annulées pour ce client
     * @return float
     * @Groups({"customers_read"})
     */
    public function getPaidAmount(): float
    {
        return array_reduce($this->invoices->toArray(), function ($total, $invoice){
            return $total + ($invoice->getStatus() === "PAID" ? $invoice->getAmount() : 0);
        }, 0);
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getCompagny(): ?string
    {
        return $this->compagny;
    }

    public function setCompagny(?string $compagny): self
    {
        $this->compagny = $compagny;

        return $this;
    }

    /**
     * @return Collection|Invoice[]
     */
    public function getInvoices(): Collection
    {
        return $this->invoices;
    }

    public function addInvoice(Invoice $invoice): self
    {
        if (!$this->invoices->contains($invoice)) {
            $this->invoices[] = $invoice;
            $invoice->setCustomer($this);
        }

        return $this;
    }

    public function removeInvoice(Invoice $invoice): self
    {
        if ($this->invoices->contains($invoice)) {
            $this->invoices->removeElement($invoice);
            // set the owning side to null (unless already changed)
            if ($invoice->getCustomer() === $this) {
                $invoice->setCustomer(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}